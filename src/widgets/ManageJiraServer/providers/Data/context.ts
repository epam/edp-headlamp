import React from 'react';
import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { JiraServerKubeObjectInterface } from '../../../../k8s/groups/EDP/JiraServer/types';
import { WidgetPermissions } from '../../types';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  secret: null as unknown as SecretKubeObjectInterface,
  jiraServer: null as unknown as JiraServerKubeObjectInterface,
  ownerReference: null as unknown as string,
  handleClosePanel: () => {
    //
  },
  permissions: null as unknown as WidgetPermissions,
});
