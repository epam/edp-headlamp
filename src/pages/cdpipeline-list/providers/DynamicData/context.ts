import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  CDPipelines: {
    data: null,
    isLoading: true,
    errors: null,
  },
});
