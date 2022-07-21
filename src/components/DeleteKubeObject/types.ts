import { k8s } from '../../plugin.types';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface DeleteKubeObjectProps {
    popupOpen: boolean;
    setPopupOpen(boolean): void;
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    description: string;
    onDelete?(): void;
}
