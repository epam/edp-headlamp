import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../types/global';
import { CodebaseAuthData } from '../../types';

export interface CreateCodebaseFormProps {
    type: string;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(
        data: DeepPartial<EDPCodebaseKubeObjectInterface>,
        codebaseAuthData: CodebaseAuthData | null
    ): void;
}
