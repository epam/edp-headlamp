import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  component: initialData,
  pipelines: {
    data: {
      review: '',
      build: '',
    },
    isLoading: true,
    error: null,
  },
  codebaseBranches: initialData,
  gitServerByCodebase: {
    data: undefined,
    isLoading: true,
    error: null,
  },
});
