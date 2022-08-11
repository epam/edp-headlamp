import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../../../types/forms';

export interface ApplicationCodebaseInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
    type: string;
}
