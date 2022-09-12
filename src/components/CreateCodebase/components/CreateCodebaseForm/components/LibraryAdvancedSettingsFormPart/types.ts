import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface LibraryAdvancedSettingsFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}
