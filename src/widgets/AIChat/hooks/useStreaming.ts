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

          const lines = value.split('\n');

          for (let i = 0; i < lines.length; i++) {
            try {
              const line = lines[i];
              if (!line) {
                continue;
              }

              const chunk: C = JSON.parse(lines[i]);
              accumulator = await onNewChunk(chunk, accumulator);
            } catch (e) {
              console.error('JSON parsing failed for line', lines[i]);
            }
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
