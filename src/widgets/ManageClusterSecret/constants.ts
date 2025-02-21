import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';

export const widgetPermissionsToCheck = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};

export const CLUSTER_TYPE = {
  BEARER: 'bearer',
  IRSA: 'irsa',
} as const;
