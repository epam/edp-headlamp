import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeQuickLinkList = {
  name: 'Quick Links',
  path: '/configuration/quicklinks',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
  exact: true,
};
