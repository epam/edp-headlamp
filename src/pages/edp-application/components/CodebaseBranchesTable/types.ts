import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface CodebaseBranchesTableProps {
    kubeObject: KubeObject;
    kubeObjectData: KubeObjectInterface;
}
