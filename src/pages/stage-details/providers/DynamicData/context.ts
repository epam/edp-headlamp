import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  stage: initialData,
  autotestPipelineRuns: initialData,
  deployPipelineRuns: initialData,
  cleanPipelineRuns: initialData,
  autotestRunnerPipelineRuns: initialData,
  argoApplications: initialData,
  deployPipelineRunTemplate: initialData,
  cleanPipelineRunTemplate: initialData,
  gitServers: initialData,
});
