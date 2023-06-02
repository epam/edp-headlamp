import { useEnrichedApplicationsWithImageStreamsQuery } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { React } from '../../../../plugin.globals';
import { useCDPipelineContext } from '../CDPipeline/hooks';
import { EnrichedApplicationsContext } from './context';

export const EnrichedApplicationsContextProvider: React.FC = ({ children }) => {
    const { CDPipeline } = useCDPipelineContext();

    const {
        isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
        data: enrichedApplications,
    } = useEnrichedApplicationsWithImageStreamsQuery({
        props: {
            CDPipelineData: CDPipeline,
        },
    });

    const enrichedApplicationsValue = React.useMemo(
        () => !isEnrichedApplicationsWithImageStreamsQueryLoading && enrichedApplications,
        [enrichedApplications, isEnrichedApplicationsWithImageStreamsQueryLoading]
    );

    return (
        <EnrichedApplicationsContext.Provider
            value={{ enrichedApplications: enrichedApplicationsValue }}
        >
            {children}
        </EnrichedApplicationsContext.Provider>
    );
};
