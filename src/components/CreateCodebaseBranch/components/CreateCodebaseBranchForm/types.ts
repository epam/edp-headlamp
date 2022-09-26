import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { DeepPartial } from '../../../../types/global';

export interface CreateCodebaseBranchFormProps {
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(newCodebaseBranchData: DeepPartial<EDPCodebaseBranchKubeObjectInterface>): void;
    isApplying: boolean;
}
