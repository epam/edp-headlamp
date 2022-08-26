import { getNamespaces } from '../../k8s/common/getNamespaces';
import { React } from '../../plugin.globals';

export const useNamespaces = (): { namespaces: string[] } => {
    const [namespaces, setNamespaces] = React.useState<string[]>([]);
    const fetchNamespaces = React.useCallback(async () => {
        const namespaces = await getNamespaces();
        setNamespaces(namespaces);
    }, []);

    React.useEffect(() => {
        fetchNamespaces().catch(console.error);
    }, [fetchNamespaces]);

    return { namespaces };
};
