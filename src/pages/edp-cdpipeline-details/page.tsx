import React from 'react';
import { withErrorBoundary } from '../../hocs/WithErrorBoundary';
import { withQueryClient } from '../../hocs/WithQueryClient';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineContextProvider } from './providers/CDPipeline/provider';
import { CDPipelineStagesContextProvider } from './providers/CDPipelineStages/provider';
import { EnrichedApplicationsContextProvider } from './providers/EnrichedApplications/provider';
import { PageView } from './view';

const Page = () => {
    return (
        <CDPipelineContextProvider>
            <CDPipelineStagesContextProvider>
                <EnrichedApplicationsContextProvider>
                    <ResourceActionListContextProvider>
                        <PageView />
                    </ResourceActionListContextProvider>
                </EnrichedApplicationsContextProvider>
            </CDPipelineStagesContextProvider>
        </CDPipelineContextProvider>
    );
};

export default withQueryClient(withErrorBoundary(Page));
