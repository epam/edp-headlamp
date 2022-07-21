import { k8s } from '../../../../plugin.types';

export interface PageHeaderActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: k8s.cluster.KubeObjectInterface;
}
