import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectProps {
    popupOpen: boolean;
    setPopupOpen(boolean): void;
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    description: string;
}
