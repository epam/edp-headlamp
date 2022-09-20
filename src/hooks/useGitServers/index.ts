import { getGitServers } from '../../k8s/common/getGitServers';
import { React } from '../../plugin.globals';

interface UseGitServerProps {
    namespace: string;
}

export const useGitServers = ({
    namespace,
}: UseGitServerProps): { gitServers: string[]; error: Error } => {
    const [gitServers, setGitServers] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getGitServers(namespace);
                const gitServersNames = items.map(el => el.metadata.name);
                setGitServers(gitServersNames);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace]);

    return { gitServers, error };
};
