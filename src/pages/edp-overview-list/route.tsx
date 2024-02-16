import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPOverviewList = {
  name: 'Overview',
  path: '/',
  sidebar: createSidebarItemName('overview'),
  exact: true,
};
