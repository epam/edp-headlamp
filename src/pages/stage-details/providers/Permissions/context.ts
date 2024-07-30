import React from 'react';
import { PermissionsContextProviderValue } from './types';

export const PermissionsContext = React.createContext<PermissionsContextProviderValue>({
  stage: {
    update: false,
    delete: false,
  },
  pipelineRun: {
    create: false,
    update: false,
    delete: false,
  },
  argoApplication: {
    delete: false,
  },
});
