import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { KubeObjectConfig } from '../../types/configs/k8s';

export interface PermissionConfig {
  instance: KubeObjectClass;
  config: KubeObjectConfig;
}

export type ExtractKinds<T extends PermissionConfig> = T['config']['kind'];

export type PermissionsMap<T extends PermissionConfig[]> = {
  [P in ExtractKinds<T[number]>]: boolean;
};

export type PermissionsConfig<T extends Record<string, PermissionConfig[]>> = {
  [Action in keyof T]: PermissionsMap<T[Action]>;
};

export type PermissionsProviderProps<T extends Record<string, PermissionConfig[]>> = {
  children: React.ReactNode;
  permissionConfigs: T;
};
