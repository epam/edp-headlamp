import React from 'react';
import { PermissionsContextProviderValue } from './types';

export const PermissionsContext = React.createContext<PermissionsContextProviderValue>({
  pipelineRun: {
    create: false,
    update: false,
    delete: false,
  },
  codebase: {
    update: false,
    delete: false,
  },
  codebaseBranch: {
    create: false,
    delete: false,
  },
});
