import { QueryClient, QueryClientProvider } from 'react-query';
import { React } from '../../plugin.globals';

export const withQueryClient = WrappedComponent => props => {
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
        <QueryClientProvider client={queryClient}>
            <WrappedComponent {...props} />
        </QueryClientProvider>
    );
};
