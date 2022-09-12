import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface AutotestAdvancedSettingsFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}
