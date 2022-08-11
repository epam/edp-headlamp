import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../../../types/forms';

export interface ApplicationAdvancedSettingsFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
}
