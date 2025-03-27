import React from 'react';
import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { FORM_MODES } from '../../../../types/forms';
import { WidgetPermissions } from '../../types';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  secret: null as unknown as SecretKubeObjectInterface,
  quickLink: null as unknown as QuickLinkKubeObjectInterface,
  mode: FORM_MODES.CREATE,
  ownerReference: null as unknown as string,
  handleClosePanel: () => {
    //
  },
  permissions: null as unknown as WidgetPermissions,
});
