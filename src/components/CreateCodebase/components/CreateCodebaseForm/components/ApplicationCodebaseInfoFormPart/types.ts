import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface ApplicationCodebaseInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    type: string;
}
