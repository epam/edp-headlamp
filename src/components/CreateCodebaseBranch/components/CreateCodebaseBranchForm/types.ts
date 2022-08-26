import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface CreateCodebaseBranchFormProps {
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(data: EDPKubeObjectInterface): void;
}
