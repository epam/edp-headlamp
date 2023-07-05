import React from 'react';
import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';
import { Application } from '../../types';

export interface ApplicationRowProps {
    names: { [key: string]: FormNameObject };
    application: Application;
    setAppsWithBranches: React.Dispatch<React.SetStateAction<Application[]>>;
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}
