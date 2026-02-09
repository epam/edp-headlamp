import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../../k8s/groups/EDP/QuickLink/types';
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
  props: {
    quickLink:
      null as unknown as QuickLinkKubeObjectInterface as unknown as QuickLinkKubeObjectInterface,
    isSystem: false,
    handleApply: () => {
      //
    },
  },
  state: dialogInitialState,
});
