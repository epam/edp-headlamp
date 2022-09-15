import { getJenkinsSlaves } from '../../k8s/common/getJenkinsSlaves';
import { React } from '../../plugin.globals';

interface useJenkinsSlavesProps {
    namespace: string;
}

export const useJenkinsSlaves = ({
    namespace,
}: useJenkinsSlavesProps): { jenkinsSlaves: string[]; error: Error } => {
    const [jenkinsSlaves, setJenkinsSlaves] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getJenkinsSlaves(namespace);
                const [firstJenkinsSlave] = items;
                const jenkinsSlaves = firstJenkinsSlave.status.slaves.map(el => el.name);
                setJenkinsSlaves(jenkinsSlaves);
                setError(null);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    return { jenkinsSlaves, error };
};
