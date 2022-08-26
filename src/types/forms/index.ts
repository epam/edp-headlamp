import { SyntheticEvent } from 'react';

export interface FormNameObject {
    name: string;
    formPart?: string;
    notUsedInFormData?: boolean;
    path?: string[];
}

export interface CreationFormFieldInterface {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
}

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
