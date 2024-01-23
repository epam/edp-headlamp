import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPOverviewList = {
  name: 'Overview',
  path: `/edp/overview`,
  sidebar: createSidebarItemName('overview'),
  exact: true,
};
