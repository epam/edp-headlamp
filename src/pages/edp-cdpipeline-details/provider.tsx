import { useStreamCDPipeline } from '../../k8s/EDPCDPipeline/hooks/useStreamCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { useStreamStagesByCDPipelineName } from '../../k8s/EDPCDPipelineStage/hooks/useStreamStagesByCDPipelineName';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import {
    EnrichedApplicationWithItsImageStreams,
    useEnrichedApplicationsWithImageStreamsQuery,
} from '../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { React } from '../../plugin.globals';
import { CDPipelinePageDataProviderProps, StageDataProviderProps } from './types';

const CDPipelineDataProviderContext = React.createContext<{
    CDPipeline: EDPCDPipelineKubeObjectInterface;
}>({
    CDPipeline: null,
});

const CDPipelineStagesDataProviderContext = React.createContext<{
    stages: EDPCDPipelineStageKubeObjectInterface[];
}>({
    stages: [],
});

const EnrichedApplicationsDataProviderContext = React.createContext<{
    enrichedApplications: EnrichedApplicationWithItsImageStreams[];
}>({
    enrichedApplications: [],
});

export const useCDPipelineData = () => React.useContext(CDPipelineDataProviderContext);

export const useCDPipelineStagesData = () => React.useContext(CDPipelineStagesDataProviderContext);

export const useEnrichedApplicationsData = () =>
    React.useContext(EnrichedApplicationsDataProviderContext);

export const CDPipelinePageDataProvider: React.FC<CDPipelinePageDataProviderProps> = ({
    children,
    namespace,
    name,
}) => {
    const CDPipeline = useStreamCDPipeline({
        namespace,
        CDPipelineMetadataName: name,
    });

    const stages = useStreamStagesByCDPipelineName({
        namespace,
        CDPipelineMetadataName: name,
        select: React.useCallback(data => {
            return data.sort((a, b) => a.spec.order - b.spec.order);
        }, []),
    });

    const {
        isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
        data: enrichedApplications,
    } = useEnrichedApplicationsWithImageStreamsQuery({
        props: {
            CDPipelineData: CDPipeline,
        },
    });

    const CDPipelineValue = React.useMemo(() => CDPipeline, [CDPipeline]);
    const stagesValue = React.useMemo(() => stages, [stages]);
    const enrichedApplicationsValue = React.useMemo(
        () => !isEnrichedApplicationsWithImageStreamsQueryLoading && enrichedApplications,
        [enrichedApplications, isEnrichedApplicationsWithImageStreamsQueryLoading]
    );

    return (
        <CDPipelineDataProviderContext.Provider value={{ CDPipeline: CDPipelineValue }}>
            <CDPipelineStagesDataProviderContext.Provider value={{ stages: stagesValue }}>
                <EnrichedApplicationsDataProviderContext.Provider
                    value={{ enrichedApplications: enrichedApplicationsValue }}
                >
                    {children}
                </EnrichedApplicationsDataProviderContext.Provider>
            </CDPipelineStagesDataProviderContext.Provider>
        </CDPipelineDataProviderContext.Provider>
    );
};

const StageDataProviderContext = React.createContext<{
    stage: EDPCDPipelineStageKubeObjectInterface;
}>({
    stage: null,
});

export const useStageData = () => React.useContext(StageDataProviderContext);

export const StageDataProvider: React.FC<StageDataProviderProps> = ({ children, stage }) => {
    return (
        <StageDataProviderContext.Provider value={{ stage }}>
            {children}
        </StageDataProviderContext.Provider>
    );
};
