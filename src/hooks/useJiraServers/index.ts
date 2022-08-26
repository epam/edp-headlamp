import { getJiraServers } from '../../k8s/common/getJiraServers';
import { React } from '../../plugin.globals';

interface useJiraServersProps {
    namespace: string;
}

export const useJiraServers = ({ namespace }: useJiraServersProps): { jiraServers: string[] } => {
    const [jiraServers, setJiraServers] = React.useState<string[]>([]);

    const fetchJiraServers = React.useCallback(async (namespace: string) => {
        const jiraServers = await getJiraServers(namespace);
        setJiraServers(jiraServers);
    }, []);

    React.useEffect(() => {
        if (namespace) {
            fetchJiraServers(namespace).catch(console.error);
        }
    }, [fetchJiraServers, namespace]);

    return { jiraServers };
};
