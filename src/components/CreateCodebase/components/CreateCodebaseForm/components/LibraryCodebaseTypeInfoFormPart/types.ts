import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface LibraryCodebaseTypeInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    type: string;
}
