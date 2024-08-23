import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'tasks',
  label: 'Tasks',
  description: `Manage CI/CD pipelines' tasks`,
  routePath: '/configuration/tasks',
  docLink: EDP_USER_GUIDE.CONFIGURATION.url,
};
