import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  quickLink: null,
  codemie: null,
  codemieSecret: null,
  codemieProject: null,
  codemieProjectSettings: null,
  codemieProjectSettingsSecret: null,
  handleClosePanel: () => {
    //
  },
});
