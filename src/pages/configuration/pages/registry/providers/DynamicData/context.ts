import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  EDPConfigMap: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  pushAccountSecret: initialData,
  pullAccountSecret: initialData,
  tektonServiceAccount: initialData,
});
