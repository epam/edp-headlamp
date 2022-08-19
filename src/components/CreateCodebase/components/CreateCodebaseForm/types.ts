import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../types/forms';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { CodebaseAuthData } from '../../types';

export interface CreateCodebasenFormProps {
    type: string;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(data: EDPKubeObjectInterface, codebaseAuthData: CodebaseAuthData | null): void;
}

export interface CodebaseFieldInterface {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
}
