import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';

export const widgetPermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
};

export const CLUSTER_TYPE = {
  BEARER: 'bearer',
  IRSA: 'irsa',
} as const;
