import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeOverviewList = {
  name: 'Overview',
  path: '/overview',
  sidebar: createSidebarItemName('overview'),
  useClusterURL: true,
  noAuthRequired: false,
};
