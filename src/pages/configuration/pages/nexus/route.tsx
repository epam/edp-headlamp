import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeNexus = {
  name: 'Nexus Integration',
  path: `/configuration/nexus-integration`,
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
  exact: true,
};
