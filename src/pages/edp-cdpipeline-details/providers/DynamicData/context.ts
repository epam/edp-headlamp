import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  stages: null,
  CDPipeline: null,
  enrichedApplications: null,
});
