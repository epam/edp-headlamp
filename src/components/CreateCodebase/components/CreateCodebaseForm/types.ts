import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { CodebaseAuthData } from '../../types';

export interface CreateCodebasenFormProps {
    type: string;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(data: EDPKubeObjectInterface, codebaseAuthData: CodebaseAuthData | null): void;
}
