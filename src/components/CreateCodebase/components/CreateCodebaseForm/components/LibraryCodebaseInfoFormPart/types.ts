import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface LibraryCodebaseInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    type: string;
}
