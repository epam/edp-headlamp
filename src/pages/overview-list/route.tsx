import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeOverviewList = {
  name: 'Overview',
  path: '/',
  sidebar: createSidebarItemName('overview'),
  exact: true,
};
