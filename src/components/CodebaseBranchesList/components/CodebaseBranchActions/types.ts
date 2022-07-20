import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { KubeObject } from '../../../../plugin.types';

export interface CodebaseBranchActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPCodebaseBranchKubeObjectInterface;
    defaultBranch: string;
    codebase: EDPCodebaseKubeObjectInterface;
}
