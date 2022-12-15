import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';

export interface CodebaseActionsProps {
    kubeObjectData: EDPCodebaseKubeObjectInterface;
    isDetailsPage?: boolean;
}
