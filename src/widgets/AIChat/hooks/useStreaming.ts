// I = Initial user payload
// A = Accumulator single value
// C = Chunk value

import { useMutation } from 'react-query';

export interface UseStreamingProps<I, A, C> {
  fetcher: (message: I) => Promise<Response>;
  onStart: () => void;
  onNewChunk: (value: C, accumulator?: A[]) => Promise<A[]>;
  onFinish: (accumulator?: A[]) => void;
  onError: (error: Error) => void;
}

export const useStreaming = <I, A, C>({
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

      const response: Response = await fetcher(message);

      if (response.body) {
        const reader: ReadableStreamDefaultReader<string> = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          // Between two JSON objects, there's no newline separator, need to add
          // Add a comma between JSON objects, making it a valid JSON array string
          let jsonArrStr = value.replace(/}\s*{/g, '},{');
          // Add surrounding brackets for the JSON array string
          jsonArrStr = '[' + jsonArrStr + ']';

          try {
            const chunks: C[] = JSON.parse(jsonArrStr);

            for (const chunk of chunks) {
              // Send each chunk for processing
              accumulator = await onNewChunk(chunk, accumulator);
            }
          } catch (e) {
            console.error('JSON parsing failed for value', value, 'Error:', e);
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
