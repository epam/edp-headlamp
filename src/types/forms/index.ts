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
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
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
