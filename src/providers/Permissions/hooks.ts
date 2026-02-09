import React from 'react';
import { PermissionsContext } from './context';
import { PermissionConfig, PermissionsConfig } from './types';

export const usePermissions = <
  T extends Record<string, PermissionConfig[]>
>(): PermissionsConfig<T> => {
  const context = React.useContext(
    PermissionsContext as React.Context<PermissionsConfig<T> | undefined>
  );
  if (!context) {
    throw new Error('PermissionsContext must be used within a PermissionsProvider');
  }
  return context;
};
