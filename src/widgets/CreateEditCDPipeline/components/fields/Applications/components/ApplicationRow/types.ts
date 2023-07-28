import React from 'react';
import { Application } from '../../types';

export interface ApplicationRowProps {
    application: Application;
    setAppsWithBranches: React.Dispatch<React.SetStateAction<Application[]>>;
}
