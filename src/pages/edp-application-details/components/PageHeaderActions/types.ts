import { k8s } from '../../../../plugin.types';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface PageHeaderActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
}
