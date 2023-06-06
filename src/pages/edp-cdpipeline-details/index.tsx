import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineContextProvider } from './providers/CDPipeline/provider';
import { CDPipelineStagesContextProvider } from './providers/CDPipelineStages/provider';
import { EnrichedApplicationsContextProvider } from './providers/EnrichedApplications/provider';
import { EDPCDPipelineDetails } from './view';

export const EDPCDPipelineDetailsPage = () => {
    return (
        <CDPipelineContextProvider>
            <CDPipelineStagesContextProvider>
                <EnrichedApplicationsContextProvider>
                    <ResourceActionListContextProvider>
                        <EDPCDPipelineDetails />
                    </ResourceActionListContextProvider>
                </EnrichedApplicationsContextProvider>
            </CDPipelineStagesContextProvider>
        </CDPipelineContextProvider>
    );
};
