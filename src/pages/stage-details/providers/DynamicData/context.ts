import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  stage: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  pipelineRuns: initialData,
  deployPipelineRuns: initialData,
  cleanPipelineRuns: initialData,
  argoApplications: initialData,
  deployPipelineRunTemplate: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  cleanPipelineRunTemplate: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  gitServers: initialData,
  newPipelineRunAdded: false,
  setNewPipelineRunAdded: () => {
    //
  },
  variablesConfigMap: initialData,
  applicationPodsMap: initialData,
});
