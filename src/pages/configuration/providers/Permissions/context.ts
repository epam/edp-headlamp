import React from 'react';
import { PermissionsContextProviderValue } from './types';

export const PermissionsContext = React.createContext<PermissionsContextProviderValue>({
  secret: {
    create: false,
    update: false,
    delete: false,
  },
});
