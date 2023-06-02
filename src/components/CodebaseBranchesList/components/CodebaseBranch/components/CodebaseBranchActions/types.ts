import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';

export interface CodebaseBranchActionsProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultBranch: string;
    codebase: EDPCodebaseKubeObjectInterface;
}
