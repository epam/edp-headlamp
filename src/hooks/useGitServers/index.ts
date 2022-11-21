import { getGitServers } from '../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { React } from '../../plugin.globals';

interface UseGitServerProps {
    namespace: string;
}

export const useGitServers = ({
    namespace,
}: UseGitServerProps): { gitServers: EDPGitServerKubeObjectInterface[]; error: Error } => {
    const [gitServers, setGitServers] = React.useState<EDPGitServerKubeObjectInterface[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getGitServers(namespace);
                setGitServers(items);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace]);

    return { gitServers, error };
};
