import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  codebases: {
    data: null,
    isLoading: true,
    errors: null,
  },
});
