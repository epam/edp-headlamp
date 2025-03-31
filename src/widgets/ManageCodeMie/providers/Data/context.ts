import React from 'react';
import { WidgetPermissions } from '../../types';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  quickLink: undefined,
  codemie: undefined,
  codemieSecret: undefined,
  handleClosePanel: () => {
    //
  },
  permissions: null as unknown as WidgetPermissions,
});
