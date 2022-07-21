import type { k8s } from '../../../../../../plugin.types';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';

export interface RowActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
}
