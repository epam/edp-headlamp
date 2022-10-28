import { getCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { React } from '../../plugin.globals';

export const useCodebasesByType = ({
    namespace,
    codebaseType,
}): { applications: EDPCodebaseKubeObjectInterface[]; error: Error } => {
    const [applications, setApplications] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getCodebasesByTypeLabel(namespace, codebaseType);
                setApplications(items);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [codebaseType, namespace]);

    return { applications, error };
};
