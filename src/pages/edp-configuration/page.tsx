import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../../components/ErrorBoundary';
import { React } from '../../plugin.globals';
import { ViewModeContextProvider } from '../../providers/ViewMode';
import { PageView } from './view';

export default function () {
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
            <ErrorBoundary>
                <ViewModeContextProvider entityID={'configuration'}>
                    <PageView />
                </ViewModeContextProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}
