import React from 'react';
import { ConfigMapKubeObjectInterface } from '../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../k8s/groups/default/ServiceAccount/types';
import { WidgetPermissions } from '../../types';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  EDPConfigMap: null as unknown as ConfigMapKubeObjectInterface,
  pushAccountSecret: null as unknown as SecretKubeObjectInterface,
  pullAccountSecret: null as unknown as SecretKubeObjectInterface,
  tektonServiceAccount: null as unknown as ServiceAccountKubeObjectInterface,
  permissions: null as unknown as WidgetPermissions,
  handleCloseCreateDialog: () => {
    //
  },
});
