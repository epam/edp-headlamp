import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface CodebaseListRowActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
}
