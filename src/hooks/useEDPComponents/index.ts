import { getEDPComponents } from '../../k8s/EDPComponent';
import { React } from '../../plugin.globals';

interface UseEDPComponentsProps {
    namespace: string;
}

export const useEDPComponents = ({
    namespace,
}: UseEDPComponentsProps): { EDPComponents: string[]; error: Error } => {
    const [EDPComponents, setEDPComponents] = React.useState<string[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getEDPComponents(namespace);
                const EDPComponentsNames = items.map(el => el.spec.type);
                setEDPComponents(EDPComponentsNames);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace]);

    return { EDPComponents, error };
};
