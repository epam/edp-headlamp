import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'dependency-track-integration',
  label: 'DependencyTrack',
  description: 'Monitor and manage vulnerabilities within third-party components.',
  routePath: '/configuration/dependency-track-integration',
  docLink: EDP_OPERATOR_GUIDE.DEPENDENCY_TRACK.url,
};

export const permissionsToCheckConfig = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
