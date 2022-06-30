import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { DeepPartial } from '../../../../types/global';

export interface FloatingActionsProps {
    kubeObject: KubeObject;
    kubeObjectExample: DeepPartial<KubeObjectInterface>;
}
