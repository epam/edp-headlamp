import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { CodebaseAuthData } from '../../types';

export interface CreateCodebaseFormProps {
    setType: React.Dispatch<React.SetStateAction<CODEBASE_TYPES>>;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(
        data: DeepPartial<EDPCodebaseKubeObjectInterface>,
        codebaseAuthData: CodebaseAuthData | null
    ): void;
    isApplying: boolean;
}
