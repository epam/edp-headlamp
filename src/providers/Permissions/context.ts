import React from 'react';
import { PermissionConfig, PermissionsConfig } from './types';

// PermissionsContext definition with generic to maintain the type
export const PermissionsContext = React.createContext<
  PermissionsConfig<Record<string, PermissionConfig[]>> | undefined
>(undefined);
