import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';

export interface TableHeaderActionsProps {
    codebase: EDPCodebaseKubeObjectInterface;
    defaultBranch: EDPCodebaseBranchKubeObjectInterface;
}
