import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDetectNamespaces } from '../../hooks/useDetectNamespaces';
import ErrorBoundary from '../ErrorBoundary';

export const PageLogicWrapper: React.FC = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });

    useDetectNamespaces();

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </QueryClientProvider>
    );
};
