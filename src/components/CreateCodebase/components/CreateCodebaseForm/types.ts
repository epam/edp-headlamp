import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../types/forms';

export interface CreateCodebasenFormProps {
    type: string;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(data): void;
}

export interface CodebaseFieldInterface {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
}
