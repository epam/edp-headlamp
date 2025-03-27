import React from 'react';
import { ConfigMapKubeObjectInterface } from '../../../../../k8s/groups/default/ConfigMap/types';
import { CurrentDialogContextProviderValue } from './types';

const dialogInitialState = {
  open: false,
  openDialog: () => {
    //
  },
  closeDialog: () => {
    //
  },
};

export const CurrentDialogContext = React.createContext<CurrentDialogContextProviderValue>({
  props: {},
  state: dialogInitialState,
  extra: {
    EDPConfigMap: null as unknown as ConfigMapKubeObjectInterface,
  },
});
