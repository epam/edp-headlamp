import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface ApplicationAdvancedSettingsFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}
