import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../../../../types/forms';

export interface RepositoryUrlProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(event: SyntheticEvent): void;
}
