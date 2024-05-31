import React from 'react';
import { PermissionsContextProviderValue } from './types';

export const PermissionsContext = React.createContext<PermissionsContextProviderValue>({
  cdPipeline: {
    update: false,
    delete: false,
  },
  stage: {
    create: false,
  },
});
