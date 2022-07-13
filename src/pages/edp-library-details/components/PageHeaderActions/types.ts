import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface PageHeaderActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPCodebaseKubeObjectInterface;
}
