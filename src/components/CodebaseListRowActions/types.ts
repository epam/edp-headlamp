import { k8s } from '../../plugin.types';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface CodebaseListRowActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
}
