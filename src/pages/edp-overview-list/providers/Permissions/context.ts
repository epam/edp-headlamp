import React from 'react';
import { PermissionsContextProviderValue } from './types';

export const PermissionsContext = React.createContext<PermissionsContextProviderValue>({
  quickLink: {
    create: false,
    delete: false,
    update: false,
  },
});
