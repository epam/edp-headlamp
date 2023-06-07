import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface CodebaseBranchActionsProps {
    defaultBranch: string;
    codebase: EDPCodebaseKubeObjectInterface;
}
