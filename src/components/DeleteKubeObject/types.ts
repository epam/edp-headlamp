import type { k8s } from '../../plugin.types';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectProps {
    popupOpen: boolean;
    setPopupOpen(boolean): void;
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    objectName: string;
    description: string;
    onBeforeSubmit?(
        setErrorTemplate: () => React.ReactElement,
        setLoadingActive: () => void
    ): Promise<void>;
}
