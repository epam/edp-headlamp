import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  EDPConfigMap: null,
  pushAccountSecret: null,
  pullAccountSecret: null,
  tektonServiceAccount: null,
});
