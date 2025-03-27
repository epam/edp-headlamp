import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { WidgetPermissions } from '../../types';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  quickLink: null as unknown as QuickLinkKubeObjectInterface,
  codemie: null,
  codemieSecret: null,
  handleClosePanel: () => {
    //
  },
  permissions: null as unknown as WidgetPermissions,
});
