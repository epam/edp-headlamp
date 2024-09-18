import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ConfigMapKubeObject } from '../../../../k8s/groups/default/ConfigMap';
import { ConfigMapKubeObjectConfig } from '../../../../k8s/groups/default/ConfigMap/config';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { ServiceAccountKubeObject } from '../../../../k8s/groups/default/ServiceAccount';
import { ServiceAccountKubeObjectConfig } from '../../../../k8s/groups/default/ServiceAccount/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'registry-list',
  label: 'Registry',
  description: 'Establish platform integration with the Container Registry.',
  routePath: '/configuration/registry',
  docLink: EDP_USER_GUIDE.REGISTRY.url,
};

export const pagePermissionsToCheck = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: ConfigMapKubeObject, config: ConfigMapKubeObjectConfig },
    { instance: ServiceAccountKubeObject, config: ServiceAccountKubeObjectConfig },
  ],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
