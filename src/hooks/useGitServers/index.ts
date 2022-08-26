import { getGitServers } from '../../k8s/common/getGitServers';
import { React } from '../../plugin.globals';

interface useGitServerProps {
    namespace: string;
}

export const useGitServers = ({ namespace }: useGitServerProps): { gitServers: string[] } => {
    const [gitServers, setGitServers] = React.useState<string[]>([]);

    const fetchGitServers = React.useCallback(async (namespace: string) => {
        const gitServers = await getGitServers(namespace);
        setGitServers(gitServers);
    }, []);

    React.useEffect(() => {
        if (namespace) {
            fetchGitServers(namespace).catch(console.error);
        }
    }, [fetchGitServers, namespace]);

    return { gitServers };
};
