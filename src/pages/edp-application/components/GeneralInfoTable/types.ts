import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface GeneralInfoTableProps {
    kubeObject: KubeObject;
    kubeObjectData: KubeObjectInterface;
}
