import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
    CDPipeline: null,
    stages: null,
    enrichedApplications: null,
    gitOpsCodebase: null,
});
