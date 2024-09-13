import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../ErrorBoundary';

let queryClientInstance;

export function getQueryClient() {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    });
  }

  return queryClientInstance;
}

export const PageLogicWrapper: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </QueryClientProvider>
  );
};
