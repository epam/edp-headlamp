import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  CDPipeline: {
    data: null,
    error: null,
    isLoading: true,
  },
  stages: {
    data: null,
    error: null,
    isLoading: true,
  },
  stagesWithApplicationsData: {
    data: null,
    error: null,
    isLoading: true,
  },
});
