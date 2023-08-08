import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DialogContextProvider } from '../../providers/Dialog';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineQueryContextProvider } from './providers/CDPipelineQuery/provider';
import { CDPipelineStageContextProvider } from './providers/CDPipelineStage/provider';
import { CDPipelineStagesQueryContextProvider } from './providers/CDPipelineStagesQuery/provider';
import { EnrichedApplicationsContextProvider } from './providers/EnrichedApplications/provider';
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
                <CDPipelineQueryContextProvider>
                    <CDPipelineStagesQueryContextProvider>
                        <EnrichedApplicationsContextProvider>
                            <CDPipelineStageContextProvider>
                                <DialogContextProvider>
                                    <ResourceActionListContextProvider>
                                        <PageView />
                                    </ResourceActionListContextProvider>
                                </DialogContextProvider>
                            </CDPipelineStageContextProvider>
                        </EnrichedApplicationsContextProvider>
                    </CDPipelineStagesQueryContextProvider>
                </CDPipelineQueryContextProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}
