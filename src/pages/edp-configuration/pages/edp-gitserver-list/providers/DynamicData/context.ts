import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  gitServers: initialData,
  repositorySecrets: initialData,
  configMaps: initialData,
  ingresses: initialData,
});
