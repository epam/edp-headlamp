import { useStreamStagesByCDPipelineName } from '../../../../k8s/EDPCDPipelineStage/hooks/useStreamStagesByCDPipelineName';
import { React, ReactRouter } from '../../../../plugin.globals';
import { EDPCDPipelineRouteParams } from '../../types';
import { CDPipelineStagesContext } from './context';

const { useParams } = ReactRouter;

export const CDPipelineStagesContextProvider: React.FC = ({ children }) => {
    const { namespace, name } = useParams<EDPCDPipelineRouteParams>();

    const stages = useStreamStagesByCDPipelineName({
        namespace,
        CDPipelineMetadataName: name,
        select: React.useCallback(data => {
            return data.sort((a, b) => a.spec.order - b.spec.order);
        }, []),
    });

    const stagesValue = React.useMemo(() => stages, [stages]);

    return (
        <CDPipelineStagesContext.Provider value={{ stages: stagesValue }}>
            {children}
        </CDPipelineStagesContext.Provider>
    );
};
