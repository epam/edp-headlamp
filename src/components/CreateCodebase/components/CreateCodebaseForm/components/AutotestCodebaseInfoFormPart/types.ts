import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface AutotestCodebaseInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    type: string;
}
