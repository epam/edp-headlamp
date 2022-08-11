export interface FormNameObject {
    name: string;
    formPart: string;
    notUsedInFormData?: boolean;
    path?: string;
}

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
