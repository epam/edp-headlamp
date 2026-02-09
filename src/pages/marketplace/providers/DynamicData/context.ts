import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  templates: {
    data: null,
    isLoading: true,
    errors: null,
  },
});
