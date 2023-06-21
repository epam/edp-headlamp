import { useStreamCDPipeline } from '../../../../k8s/EDPCDPipeline/hooks/useStreamCDPipeline';
import { React, ReactRouter } from '../../../../plugin.globals';
import { EDPCDPipelineRouteParams } from '../../types';
import { CDPipelineContext } from './context';

const { useParams } = ReactRouter;

export const CDPipelineContextProvider: React.FC = ({ children }) => {
    const { namespace, name } = useParams<EDPCDPipelineRouteParams>();

    const CDPipeline = useStreamCDPipeline({
        namespace,
        CDPipelineMetadataName: name,
    });

    return (
        <CDPipelineContext.Provider value={{ CDPipeline }}>{children}</CDPipelineContext.Provider>
    );
};
