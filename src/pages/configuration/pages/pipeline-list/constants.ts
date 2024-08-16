import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'pipelines',
  label: 'Pipelines',
  description: 'Manage CI/CD pipelines.',
  routePath: '/configuration/pipelines',
  docLink: EDP_USER_GUIDE.CONFIGURATION.url,
};
