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
    codebase: null,
    codebaseBranch: null,
    defaultBranch: null,
    pipelines: {
      review: '',
      build: '',
    },
  },
  state: dialogInitialState,
  extra: {
    buildPipelines: null,
    reviewPipelines: null,
  },
});
