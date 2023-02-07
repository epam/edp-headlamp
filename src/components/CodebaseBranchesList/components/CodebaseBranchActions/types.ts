import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';

export interface CodebaseBranchActionsProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultBranch: string;
    codebase: EDPCodebaseKubeObjectInterface;
    gitServers: EDPGitServerKubeObjectInterface[];
}
