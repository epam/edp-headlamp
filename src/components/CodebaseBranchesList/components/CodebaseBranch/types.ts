import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { TriggerTemplateKubeObjectInterface } from '../../../../k8s/TriggerTemplate/types';
import { React } from '../../../../plugin.globals';

export interface CodebaseBranchProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultBranch: string;
    expandedPanel: string;
    id: string;
    codebaseData: EDPCodebaseKubeObjectInterface;
    handlePanelChange: (
        panel: string
    ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    gitServers: EDPGitServerKubeObjectInterface[];
    triggerTemplates: TriggerTemplateKubeObjectInterface[];
}
