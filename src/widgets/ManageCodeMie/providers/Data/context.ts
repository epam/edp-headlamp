import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  quickLink: null,
  codemie: null,
  codemieSecret: null,
  handleClosePanel: () => {
    //
  },
  permissions: null,
});
