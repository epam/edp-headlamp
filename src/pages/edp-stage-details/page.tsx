import { withErrorBoundary } from '../../hocs/WithErrorBoundary';
import { withQueryClient } from '../../hocs/WithQueryClient';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { CDPipelineQueryContextProvider } from './providers/CDPipelineQuery/provider';
import { CDPipelineStageContextProvider } from './providers/CDPipelineStage/provider';
import { CDPipelineStagesQueryContextProvider } from './providers/CDPipelineStagesQuery/provider';
import { EnrichedApplicationsContextProvider } from './providers/EnrichedApplications/provider';
import { PageView } from './view';

const Page = () => {
    return (
        <CDPipelineQueryContextProvider>
            <CDPipelineStagesQueryContextProvider>
                <EnrichedApplicationsContextProvider>
                    <CDPipelineStageContextProvider>
                        <ResourceActionListContextProvider>
                            <PageView />
                        </ResourceActionListContextProvider>
                    </CDPipelineStageContextProvider>
                </EnrichedApplicationsContextProvider>
            </CDPipelineStagesQueryContextProvider>
        </CDPipelineQueryContextProvider>
    );
};

export default withQueryClient(withErrorBoundary(Page));
