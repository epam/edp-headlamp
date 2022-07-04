import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface FloatingActionsProps {
    kubeObject: KubeObject;
    kubeObjectExample: DeepPartial<EDPKubeObjectInterface>;
}
