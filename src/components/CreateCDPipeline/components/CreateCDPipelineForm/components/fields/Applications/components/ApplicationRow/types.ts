import { SyntheticEvent } from 'react';
import { FormNameObject } from '../../../../../../../../../types/forms';
import { Application } from '../../types';

export interface ApplicationRowProps {
    names: { [key: string]: FormNameObject };
    application: Application;
    setApplications(prev: any): Application[];
    handleFormFieldChange(event: SyntheticEvent): void;
}
