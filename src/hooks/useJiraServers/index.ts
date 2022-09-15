import { getJiraServers } from '../../k8s/common/getJiraServers';
import { React } from '../../plugin.globals';

interface useJiraServersProps {
    namespace: string;
}

export const useJiraServers = ({
    namespace,
}: useJiraServersProps): { jiraServers: string[]; error: Error } => {
    const [jiraServers, setJiraServers] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getJiraServers(namespace);
                const jiraServers = items.map(el => el.metadata.name);
                setJiraServers(jiraServers);
                setError(null);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    return { jiraServers, error };
};
