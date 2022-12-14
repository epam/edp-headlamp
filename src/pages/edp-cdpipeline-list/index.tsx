import { CDPipelineList } from '../../components/CDPipelineList';
import { CreateCDPipeline } from '../../components/CreateCDPipeline';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { useNamespace } from '../../hooks/useNamespace';
import { streamCDPipelines } from '../../k8s/EDPCDPipeline/streamCDPipelines';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { pluginLib, React } from '../../plugin.globals';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPCDPipelineList = (): React.ReactElement => {
    const { namespace } = useNamespace();

    const [CDPipelines, setCDPipelines] = React.useState<EDPCDPipelineKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);

    const handleStoreCDPipelines = React.useCallback(
        (cdpipelines: EDPCDPipelineKubeObjectInterface[]) => {
            setCDPipelines(cdpipelines);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCDPipelines(handleStoreCDPipelines, handleError, namespace);

        return () => {
            cancelStream();
        };
    }, [handleError, handleStoreCDPipelines, namespace]);

    return (
        <SectionBox
            title={
                <SectionFilterHeader title="CD Pipelines" headerStyle="label" noNamespaceFilter />
            }
        >
            <CreateKubeObject>
                <CreateCDPipeline />
            </CreateKubeObject>
            <CDPipelineList CDPipelines={CDPipelines} />
        </SectionBox>
    );
};
