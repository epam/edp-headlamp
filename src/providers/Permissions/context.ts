import React from 'react';
import { PermissionConfig, PermissionsConfig } from './types';

export const PermissionsContext = React.createContext<
  PermissionsConfig<Record<string, PermissionConfig[]>> | undefined
>(undefined);
