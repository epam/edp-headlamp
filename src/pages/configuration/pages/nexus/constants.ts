import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'nexus-integration',
  label: 'Nexus',
  description: 'Store and manage your application artifacts in Nexus.',
  routePath: '/configuration/nexus-integration',
  docLink: EDP_OPERATOR_GUIDE.NEXUS.url,
};

export const permissionsToCheckConfig = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
