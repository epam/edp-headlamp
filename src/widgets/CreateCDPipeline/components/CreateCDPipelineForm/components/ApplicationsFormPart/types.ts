import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface ApplicationsFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}
