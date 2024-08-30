import React from 'react';
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
    quickLink: null,
    isSystem: false,
    handleApply: () => {
      //
    },
  },
  state: dialogInitialState,
});
