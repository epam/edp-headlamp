import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DialogContextProvider } from '../../providers/Dialog';
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
                <ViewModeContextProvider entityID={'marketplace'}>
                    <DialogContextProvider>
                        <PageView />
                    </DialogContextProvider>
                </ViewModeContextProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}