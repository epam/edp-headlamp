import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION: PageDescription = {
  id: 'gitops',
  label: 'GitOps',
  description: 'Set up the required environment state using the GitOps approach.',
  routePath: '/configuration/gitops',
  docLink: EDP_USER_GUIDE.GIT_OPS.url,
};

export const permissionChecks = {
  CODEBASE: 'codebase',
} as const;
