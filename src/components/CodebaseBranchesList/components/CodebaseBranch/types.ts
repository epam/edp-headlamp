import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
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
}
