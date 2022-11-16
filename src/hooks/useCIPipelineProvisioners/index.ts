import { getJenkinsList } from '../../k8s/Jenkins';
import { React } from '../../plugin.globals';

interface useCIPipelineProvisionersProps {
    namespace: string;
}

export const useCIPipelineProvisioners = ({
    namespace,
}: useCIPipelineProvisionersProps): { CIPipelineProvisioners: string[]; error: Error } => {
    const [CIPipelineProvisioners, setCIPipelineProvisioners] = React.useState<string[]>(null);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { items: jenkinsList } = await getJenkinsList(namespace);
                const [jenkinsObject] = jenkinsList;
                const CIPipelineProvisionerList = jenkinsObject.status.jobProvisions.reduce(
                    (acc, cur) => {
                        const { scope, name } = cur;
                        if (scope === 'ci') {
                            acc.push(name);
                        }
                        return acc;
                    },
                    []
                );

                setCIPipelineProvisioners(CIPipelineProvisionerList);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    if (CIPipelineProvisioners) {
        return { CIPipelineProvisioners, error };
    }

    return { CIPipelineProvisioners: [], error };
};
