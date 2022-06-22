import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface PageHeaderActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: KubeObjectInterface;
}
