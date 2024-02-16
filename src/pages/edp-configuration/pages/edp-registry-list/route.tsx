import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeEDPRegistryList = {
  name: 'Container Registry',
  path: '/configuration/registry',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
  exact: true,
};
