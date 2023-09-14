import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DialogContextProvider } from '../../providers/Dialog';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
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
                <DialogContextProvider>
                    <ResourceActionListContextProvider>
                        <DataContextProvider>
                            <DynamicDataContextProvider>
                                <PageView />
                            </DynamicDataContextProvider>
                        </DataContextProvider>
                    </ResourceActionListContextProvider>
                </DialogContextProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}
