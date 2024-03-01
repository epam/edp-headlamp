import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  data: {
    gitServers: null,
    repositorySecrets: null,
  },
  isLoading: false,
});
