import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../../components/ErrorBoundary';
import { React } from '../../plugin.globals';
import { DialogContextProvider } from '../../providers/Dialog';

export const withPageWrapper = WrappedComponent => props => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <DialogContextProvider>
                    <WrappedComponent {...props} />
                </DialogContextProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
