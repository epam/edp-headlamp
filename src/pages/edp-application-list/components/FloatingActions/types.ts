import { k8s } from '../../../../plugin.types';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface FloatingActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectExample: DeepPartial<EDPKubeObjectInterface>;
    onCreate?(): void;
}
