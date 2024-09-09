import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'sonar-integration',
  label: 'SonarQube',
  description: 'Enable automated code review mechanisms powered by SonarQube.',
  routePath: '/configuration/sonar-integration',
  docLink: EDP_OPERATOR_GUIDE.SONAR.url,
};

export const permissionsToCheckConfig = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
