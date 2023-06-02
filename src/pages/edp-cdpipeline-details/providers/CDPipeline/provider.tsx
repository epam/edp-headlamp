import { useStreamCDPipeline } from '../../../../k8s/EDPCDPipeline/hooks/useStreamCDPipeline';
import { React, ReactRouter } from '../../../../plugin.globals';
import { CDPipelineContext } from './context';

const { useParams } = ReactRouter;

export const CDPipelineContextProvider: React.FC = ({ children }) => {
    const { namespace, name } = useParams();

    const CDPipeline = useStreamCDPipeline({
        namespace,
        CDPipelineMetadataName: name,
    });

    const CDPipelineValue = React.useMemo(() => CDPipeline, [CDPipeline]);

    return (
        <CDPipelineContext.Provider value={{ CDPipeline: CDPipelineValue }}>
            {children}
        </CDPipelineContext.Provider>
    );
};
