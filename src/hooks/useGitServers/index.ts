import { getGitServers } from '../../k8s/common/getGitServers';
import { React } from '../../plugin.globals';

interface useGitServerProps {
    namespace: string;
}

export const useGitServers = ({
    namespace,
}: useGitServerProps): { gitServers: string[]; error: Error } => {
    const [gitServers, setGitServers] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getGitServers(namespace);
                const gitServers = items.map(el => el.metadata.name);
                setGitServers(gitServers);
                setError(null);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    return { gitServers, error };
};
