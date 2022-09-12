import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface ApplicationCodebaseTypeInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    type: string;
}
