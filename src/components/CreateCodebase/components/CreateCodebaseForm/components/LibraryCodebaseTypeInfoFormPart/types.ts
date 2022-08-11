import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../../../types/forms';

export interface LibraryCodebaseTypeInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
    type: string;
}
