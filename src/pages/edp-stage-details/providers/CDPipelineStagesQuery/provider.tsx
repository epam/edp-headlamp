import { useCDPipelineStageListByCDPipelineNameQuery } from '../../../../k8s/EDPCDPipelineStage/hooks/useCDPipelineStageListByCDPipelineNameQuery';
import { React, ReactRouter } from '../../../../plugin.globals';
import { EDPStageDetailsRouteParams } from '../../types';
import { CDPipelineStagesQueryContext } from './context';

const { useParams } = ReactRouter;

export const CDPipelineStagesQueryContextProvider: React.FC = ({ children }) => {
    const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();
    const query = useCDPipelineStageListByCDPipelineNameQuery({
        props: {
            namespace,
            CDPipelineMetadataName: CDPipelineName,
        },
    });

    const stagesQueryValue = React.useMemo(() => query, [query]);

    return (
        <CDPipelineStagesQueryContext.Provider value={{ stagesQuery: stagesQueryValue }}>
            {children}
        </CDPipelineStagesQueryContext.Provider>
    );
};
