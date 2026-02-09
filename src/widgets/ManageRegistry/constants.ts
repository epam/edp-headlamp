import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ConfigMapKubeObject } from '../../k8s/groups/default/ConfigMap';
import { ConfigMapKubeObjectConfig } from '../../k8s/groups/default/ConfigMap/config';
import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';
import { ServiceAccountKubeObject } from '../../k8s/groups/default/ServiceAccount';
import { ServiceAccountKubeObjectConfig } from '../../k8s/groups/default/ServiceAccount/config';

export const FORM_NAMES = {
  SHARED: 'shared',
  CONFIG_MAP: 'configMap',
  SERVICE_ACCOUNT: 'serviceAccount',
  PUSH_ACCOUNT: 'pushAccount',
  PULL_ACCOUNT: 'pullAccount',
} as const;

export const widgetPermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: ConfigMapKubeObject as unknown as KubeObjectClass,
      config: ConfigMapKubeObjectConfig,
    },
    {
      instance: ServiceAccountKubeObject as unknown as KubeObjectClass,
      config: ServiceAccountKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
};

export const DOCKER_HUB_REGISTRY_ENDPOINT = 'docker.io';
export const DOCKER_HUB_REGISTRY_ENDPOINT_VALUE = 'https://index.docker.io/v1/';

export const GHCR_ENDPOINT = 'ghcr.io';
export const GHCR_ENDPOINT_VALUE = 'https://ghcr.io';
