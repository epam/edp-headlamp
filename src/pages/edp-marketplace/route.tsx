import { MARKETPLACE_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPMarketplace = {
  name: 'Marketplace',
  path: `/marketplace`,
  sidebar: createSidebarItemName(MARKETPLACE_ROUTE_NAME),
  exact: true,
};
