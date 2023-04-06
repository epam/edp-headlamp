import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { TriggerTemplateKubeObjectInterface } from '../../../../k8s/TriggerTemplate/types';

export interface CodebaseBranchActionsProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultBranch: string;
    codebase: EDPCodebaseKubeObjectInterface;
    gitServers: EDPGitServerKubeObjectInterface[];
    triggerTemplates: TriggerTemplateKubeObjectInterface[];
}
