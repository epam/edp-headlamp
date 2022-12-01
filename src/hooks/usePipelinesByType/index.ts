import { getPipelinesByType } from '../../k8s/Pipeline';
import { PipelineKubeObjectInterface } from '../../k8s/Pipeline/types';
import { React } from '../../plugin.globals';

interface UsePipelinesByTypeProps {
    namespace: string;
    pipelineType: string;
}

export const usePipelinesByType = ({
    namespace,
    pipelineType,
}: UsePipelinesByTypeProps): { pipelines: PipelineKubeObjectInterface[]; error: Error } => {
    const [pipelines, setPipelines] = React.useState<PipelineKubeObjectInterface[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getPipelinesByType(namespace, pipelineType);
                setPipelines(items);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace, pipelineType]);

    return { pipelines, error };
};
