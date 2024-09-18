import { EDP_USER_GUIDE } from '../../../../constants/urls';
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

export const pagePermissionsToCheck = {
  create: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
  update: [],
  delete: [],
};
