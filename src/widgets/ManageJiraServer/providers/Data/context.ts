import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  secret: null,
  jiraServer: null,
  ownerReference: null,
  handleClosePanel: () => {
    //
  },
  permissions: null,
});
