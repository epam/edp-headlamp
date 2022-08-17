import { getJenkinsSlaves } from '../../../../../k8s/common/getJenkinsSlaves';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useJenkinsSlavesProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
}

export const useJenkinsSlaves = ({
    watch,
    names,
}: useJenkinsSlavesProps): { jenkinsSlaves: string[] } => {
    const namespaceFieldValue = watch(names.namespace.name);

    const [jenkinsSlaves, setJenkinsSlaves] = React.useState<string[]>([]);

    const fetchJenkinsSlaves = React.useCallback(async (namespace: string) => {
        const slavesArray = await getJenkinsSlaves(namespace);
        setJenkinsSlaves(slavesArray);
    }, []);

    React.useEffect(() => {
        if (namespaceFieldValue) {
            fetchJenkinsSlaves(namespaceFieldValue).catch(console.error);
        }
    }, [fetchJenkinsSlaves, namespaceFieldValue]);

    return { jenkinsSlaves };
};
