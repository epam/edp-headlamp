import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineContextProvider } from './providers/CDPipeline/provider';
import { CDPipelineStagesContextProvider } from './providers/CDPipelineStages/provider';
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
                <CDPipelineContextProvider>
                    <CDPipelineStagesContextProvider>
                        <EnrichedApplicationsContextProvider>
                            <ResourceActionListContextProvider>
                                <PageView />
                            </ResourceActionListContextProvider>
                        </EnrichedApplicationsContextProvider>
                    </CDPipelineStagesContextProvider>
                </CDPipelineContextProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}
