import { SyntheticEvent } from 'react';

export interface FormNameObject {
    name: string;
    formPart?: string;
    notUsedInFormData?: boolean;
    path?: string[];
}

interface BackwardNameMappingChildren {
    formItemName?: string;
    children?: {
        [key: string]: BackwardNameMappingChildren;
    };
}

export interface BackwardNameMapping {
    [key: string]: {
        children?: {
            [key: string]: BackwardNameMappingChildren;
        };
    };
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
