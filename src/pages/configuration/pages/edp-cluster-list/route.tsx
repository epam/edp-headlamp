import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeEDPClusterList = {
  name: 'Clusters',
  path: '/configuration/clusters',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),

  exact: true,
};
