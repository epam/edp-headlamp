import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { PageDescription } from '../../../../types/pages';
import { routeCodemie } from './route';

export const pageDescription: PageDescription = {
  id: 'codemie-integration',
  label: 'CodeMie',
  description: 'Configure CodeMie integration.',
  routePath: routeCodemie.path,
};

export const permissionsToCheckConfig = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
