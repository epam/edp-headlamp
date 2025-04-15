import React from 'react';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { PipelineKubeObjectInterface } from '../../../../../k8s/groups/Tekton/Pipeline/types';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { DataProviderValue } from '../../../../../types/pages';
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
    codebaseBranches: null as unknown as CodebaseBranchKubeObjectInterface[],
    codebase: null as unknown as CodebaseKubeObjectInterface,
    codebaseBranch: null as unknown as CodebaseBranchKubeObjectInterface,
    defaultBranch: null as unknown as CodebaseBranchKubeObjectInterface,
    pipelines: {
      review: '',
      build: '',
    },
  },
  state: dialogInitialState,
  extra: {
    buildPipelines: null as unknown as DataProviderValue<
      KubeObjectListInterface<PipelineKubeObjectInterface>
    >,
    reviewPipelines: null as unknown as DataProviderValue<
      KubeObjectListInterface<PipelineKubeObjectInterface>
    >,
  },
});
