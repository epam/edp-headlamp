import { getJenkinsAgents } from '../../k8s/common/getJenkinsAgents';
import { React } from '../../plugin.globals';

interface useJenkinsAgentsProps {
    namespace: string;
}

export const useJenkinsAgents = ({
    namespace,
}: useJenkinsAgentsProps): { jenkinsAgents: string[]; error: Error } => {
    const [jenkinsAgents, setJenkinsAgents] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getJenkinsAgents(namespace);
                const [firstJenkinsSlave] = items;
                const jenkinsAgents = firstJenkinsSlave.status.slaves.map(el => el.name);
                setJenkinsAgents(jenkinsAgents);
                setError(null);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    return { jenkinsAgents, error };
};
