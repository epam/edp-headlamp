import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';
import { routeTaskList } from './route';

export const pageDescription: PageDescription = {
  id: 'tasks',
  label: 'Tasks',
  description: 'Manage CI/CD tasks.',
  routePath: routeTaskList.path,
  docLink: EDP_USER_GUIDE.CONFIGURATION.url,
};
