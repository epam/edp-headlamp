import { ValueOf } from '../global';

export interface FormNameObject {
    name: string;
    formPart?: string;
    path?: string[];
    notUsedInFormData?: boolean;
    value?: any;
}
export interface FormNamesObject {
    [key: string]: FormNameObject;
}
export type FormValues<T extends FormNamesObject> = Record<keyof T, any>;
export type FormNameKeys<T extends FormNamesObject> = keyof FormValues<T>;

export interface BackwardNameMappingChildren {
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

export interface CreationFormFieldInterface<
    Names = {
        [key: string]: FormNameObject;
    }
> {
    names: Names;
    handleFormFieldChange?(eventTarget: FieldEventTarget): void;
}

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface FieldEventTarget {
    name: string;
    value: any;
}

export interface FieldEvent {
    target: FieldEventTarget;
}

export const FORM_MODES = {
    CREATE: 'create',
    EDIT: 'edit',
} as const;

export type FormMode = ValueOf<typeof FORM_MODES>;
