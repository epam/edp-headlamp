import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  gitServer: null,
  gitServerSecret: null,
  permissions: null,
});
