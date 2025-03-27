import React from 'react';
import { TemplateKubeObjectInterface } from '../../../../../k8s/groups/EDP/Template/types';
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
    template: null as unknown as TemplateKubeObjectInterface,
  },
  state: dialogInitialState,
});
