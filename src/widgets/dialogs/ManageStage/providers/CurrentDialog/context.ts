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
    stage: null,
    otherStages: null,
    CDPipelineData: null,
  },
  state: dialogInitialState,
  extra: {
    buildPipelines: null,
    reviewPipelines: null,
  },
});
