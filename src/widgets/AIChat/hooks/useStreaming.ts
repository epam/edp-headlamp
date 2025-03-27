// I = Initial user payload
// A = Accumulator single value
// C = Chunk value

import { useMutation } from 'react-query';

export interface UseStreamingProps<I, A, C extends object> {
  fetcher: (message: I) => Promise<Response>;
  onStart: () => void;
  onNewChunk: (value: C, accumulator: A[]) => Promise<A[]>;
  onFinish: (accumulator?: A[]) => void;
  onError: (error: Error) => void;
}

export const streamChunkToObject = (chunk: string) => {
  // Stream object can return multiple JSON objects at once
  // e.g. {"generated_chunk": "Hello", "last": false}\n{"generated_chunk": "World", "last": true}
  // This function converts the string to an array of JSON objects
  const splitChunks = chunk.split(/}\s*{/);
  const stringChunks = splitChunks.map((str, index, array) => {
    // eslint-disable-next-line no-param-reassign
    if (index !== 0) str = '{' + str;
    // eslint-disable-next-line no-param-reassign
    if (index !== array.length - 1) str = str + '}';

    return str;
  });

  const chunkObjects: object[] = [];

  const parseChunks = (stringChunkArray: string[]) => {
    stringChunkArray.some((chunkString, index) => {
      try {
        chunkObjects.push(JSON.parse(chunkString));
      } catch (e) {
        // If we can't parse the last object it means the string is not parseable - throw error
        if (index === stringChunkArray.length - 1) throw e;
        // If not able to parse - join this item with next and try again
        const remainingItemsLength = stringChunkArray.length - index - 2;
        parseChunks([
          [stringChunkArray[index], stringChunkArray[index + 1]].join(''),
          ...(remainingItemsLength ? stringChunkArray.slice(-remainingItemsLength) : []),
        ]);
        return true; // stop parsing remaining items - they will be parsed in the call above
      }
    });
  };

  parseChunks(stringChunks);

  return chunkObjects;
};

export const useStreaming = <I, A, C extends object>({
  fetcher,
  onStart,
  onNewChunk,
  onFinish,
  onError,
}: UseStreamingProps<I, A, C>) => {
  return useMutation<A[], Error, I, unknown>(
    async (message: I): Promise<A[]> => {
      onStart();
      let accumulator: A[] = [];
      let cachedValue = '';
      let chunks;
      const response: Response = await fetcher(message);

      if (response.body) {
        const reader: ReadableStreamDefaultReader<string> = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        while (true) {
          try {
            const { done, value } = await reader.read();

            if (done) break;

            // Stream can return multiple chunks at once
            try {
              chunks = streamChunkToObject(cachedValue + value);

              cachedValue = '';

              for (const chunk of chunks) {
                accumulator = await onNewChunk(chunk as C, accumulator);
              }
            } catch (error) {
              cachedValue += value;
            }
          } catch (error) {
            // Request was aborted by user
            // if (error.name === ABORT_ERROR) return handleAbort(chat, reader);
            throw error;
          }
        }
      }

      return accumulator;
    },
    {
      onError: onError,
      onSuccess: onFinish,
    }
  );
};
