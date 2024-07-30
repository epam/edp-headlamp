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
  autotestRunnerPipelineRuns: initialData,
  argoApplications: initialData,
  deployPipelineRunTemplate: initialData,
  gitServers: initialData,
});
