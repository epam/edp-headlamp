import { getEDPComponents } from '../../k8s/EDPComponent';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { React } from '../../plugin.globals';

interface UseEDPComponentsProps {
    namespace: string;
}

export const useEDPComponents = ({
    namespace,
}: UseEDPComponentsProps): { EDPComponents: EDPComponentKubeObjectInterface[]; error: Error } => {
    const [EDPComponents, setEDPComponents] = React.useState<EDPComponentKubeObjectInterface[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getEDPComponents(namespace);
                setEDPComponents(items);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace]);

    return { EDPComponents, error };
};
