import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import type { k8s } from '../../../../plugin.types';

export interface PageHeaderActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPCodebaseKubeObjectInterface;
}
