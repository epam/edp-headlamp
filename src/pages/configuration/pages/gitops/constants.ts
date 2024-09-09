import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../../../k8s/groups/EDP/Codebase/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'gitops',
  label: 'GitOps',
  description: 'Set up the required environment state using the GitOps approach.',
  routePath: '/configuration/gitops',
  docLink: EDP_USER_GUIDE.GIT_OPS.url,
};

export const permissionsToCheckConfig = {
  create: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig },
  ],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
