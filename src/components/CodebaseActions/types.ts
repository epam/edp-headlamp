import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { KubeObject } from '../../plugin.types';

export interface CodebaseActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPCodebaseKubeObjectInterface;
}
