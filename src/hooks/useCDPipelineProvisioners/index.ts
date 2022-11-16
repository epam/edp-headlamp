import { getJenkinsList } from '../../k8s/Jenkins';
import { React } from '../../plugin.globals';

interface useCDPipelineProvisionersProps {
    namespace: string;
}

export const useCDPipelineProvisioners = ({
    namespace,
}: useCDPipelineProvisionersProps): { CDPipelineProvisioners: string[]; error: Error } => {
    const [CDPipelineProvisioners, setCDPipelineProvisioners] = React.useState<string[]>(null);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { items: jenkinsList } = await getJenkinsList(namespace);
                const [jenkinsObject] = jenkinsList;
                const CDPipelineProvisionerList = jenkinsObject.status.jobProvisions.reduce(
                    (acc, cur) => {
                        const { scope, name } = cur;
                        if (scope === 'cd') {
                            acc.push(name);
                        }
                        return acc;
                    },
                    []
                );

                setCDPipelineProvisioners(CDPipelineProvisionerList);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    if (CDPipelineProvisioners) {
        return { CDPipelineProvisioners, error };
    }

    return { CDPipelineProvisioners: [], error };
};
