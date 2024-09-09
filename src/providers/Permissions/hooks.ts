import React from 'react';
import { PermissionsContext } from './context';
import { PermissionConfig, PermissionsConfig } from './types';

export const usePermissions = <
  T extends Record<string, PermissionConfig[]>
>(): PermissionsConfig<T> =>
  React.useContext(PermissionsContext as React.Context<PermissionsConfig<T> | undefined>);
