import { getJenkinsSlaves } from '../../k8s/common/getJenkinsSlaves';
import { React } from '../../plugin.globals';

interface useJenkinsSlavesProps {
    namespace: string;
}

export const useJenkinsSlaves = ({
    namespace,
}: useJenkinsSlavesProps): { jenkinsSlaves: string[] } => {
    const [jenkinsSlaves, setJenkinsSlaves] = React.useState<string[]>([]);

    const fetchJenkinsSlaves = React.useCallback(async (namespace: string) => {
        const slavesArray = await getJenkinsSlaves(namespace);
        setJenkinsSlaves(slavesArray);
    }, []);

    React.useEffect(() => {
        if (namespace) {
            fetchJenkinsSlaves(namespace).catch(console.error);
        }
    }, [fetchJenkinsSlaves, namespace]);

    return { jenkinsSlaves };
};
