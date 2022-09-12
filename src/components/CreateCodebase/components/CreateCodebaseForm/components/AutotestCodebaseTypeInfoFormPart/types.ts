import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface AutotestCodebaseTypeInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    type: string;
}
