import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { k8s } from '../../../../plugin.types';

export interface PageHeaderActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPCodebaseKubeObjectInterface;
}
