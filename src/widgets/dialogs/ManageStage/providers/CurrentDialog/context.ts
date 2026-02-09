import React from 'react';
import { CDPipelineKubeObjectInterface } from '../../../../../k8s/groups/EDP/CDPipeline/types';
import { StageKubeObjectInterface } from '../../../../../k8s/groups/EDP/Stage/types';
import { TriggerTemplateKubeObjectInterface } from '../../../../../k8s/groups/Tekton/TriggerTemplate/types';
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
    stage: null as unknown as StageKubeObjectInterface,
    otherStages: null as unknown as StageKubeObjectInterface[],
    CDPipelineData: null as unknown as CDPipelineKubeObjectInterface,
  },
  state: dialogInitialState,
  extra: {
    cleanTriggerTemplateList: null as unknown as DataProviderValue<
      KubeObjectListInterface<TriggerTemplateKubeObjectInterface>
    >,
    deployTriggerTemplateList: null as unknown as DataProviderValue<
      KubeObjectListInterface<TriggerTemplateKubeObjectInterface>
    >,
  },
});
