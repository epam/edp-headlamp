import React from 'react';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { ApiServiceBase, GitFusionApiService } from '../../../../../services/api';
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
    codebaseData: null as unknown as CodebaseKubeObjectInterface,
  },
  state: dialogInitialState,
  apiServiceBase: null as unknown as ApiServiceBase,
  gitFusionApiService: null as unknown as GitFusionApiService,
});
