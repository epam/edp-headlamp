import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../../../types/forms';

export interface LibraryAdvancedSettingsFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
}
