import { getJiraServers } from '../../../../../k8s/common/getJiraServers';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useJiraServersProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
}

export const useJiraServers = ({
    watch,
    names,
}: useJiraServersProps): { jiraServers: string[] } => {
    const namespaceFieldValue = watch(names.namespace.name);

    const [jiraServers, setJiraServers] = React.useState<string[]>([]);

    const fetchJiraServers = React.useCallback(async (namespace: string) => {
        const jiraServers = await getJiraServers(namespace);
        setJiraServers(jiraServers);
    }, []);

    React.useEffect(() => {
        if (namespaceFieldValue) {
            fetchJiraServers(namespaceFieldValue).catch(console.error);
        }
    }, [fetchJiraServers, namespaceFieldValue]);

    return { jiraServers };
};
