import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  pipelineRun: initialData,
  taskRuns: initialData,
  pipelineRunData: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  logs: {
    data: undefined,
    isLoading: true,
    error: null,
  },
});
