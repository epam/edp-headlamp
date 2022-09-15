import { getNamespaces } from '../../k8s/common/getNamespaces';
import { React } from '../../plugin.globals';

export const useNamespaces = (): { namespaces: string[]; error: Error } => {
    const [namespaces, setNamespaces] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { items } = await getNamespaces();
                const namespaces = items.map(el => el.metadata.name);
                setNamespaces(namespaces);
                setError(null);
            } catch (error: any) {
                setError(error);
            }
        })();
    }, []);

    return { namespaces, error };
};
