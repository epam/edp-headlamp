import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  data: {
    EDPConfigMap: null,
    pushAccountSecret: null,
    pullAccountSecret: null,
    tektonServiceAccount: null,
  },
  isLoading: false,
});
