import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { KubeObjectConfig } from '../../types/configs/k8s';
import { Action } from '../../types/permissions';

export interface PermissionConfig {
  instance: KubeObjectClass;
  config: KubeObjectConfig;
}

export type ExtractKinds<T extends PermissionConfig> = T['config']['kind'];

export interface DetailedPermission {
  allowed: boolean;
  reason?: string;
}

export type PermissionsMap<T extends PermissionConfig[]> = {
  [P in ExtractKinds<T[number]>]: DetailedPermission;
};

export type PermissionsConfig<T extends Record<string, PermissionConfig[]>> = {
  [Action in keyof T]: PermissionsMap<T[Action]>;
};

export type PermissionsProviderProps<T extends Record<Action, PermissionConfig[]>> = {
  children: React.ReactNode;
  permissionConfigs: T;
};
