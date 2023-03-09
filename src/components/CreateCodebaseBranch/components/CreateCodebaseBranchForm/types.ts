import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';

export interface CreateCodebaseBranchFormProps {
    codebaseData: EDPCodebaseKubeObjectInterface;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply({
        codebaseBranchData,
        defaultCodebaseBranchData,
    }: {
        codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
        defaultCodebaseBranchData?: EDPCodebaseBranchKubeObjectInterface;
    }): void;
    isApplying: boolean;
}
