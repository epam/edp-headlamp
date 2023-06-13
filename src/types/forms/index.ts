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
export type FormData<T extends FormNamesObject> = Record<keyof T, any>;
export type FormNameKeys<T extends FormNamesObject> = keyof FormData<T>;

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
