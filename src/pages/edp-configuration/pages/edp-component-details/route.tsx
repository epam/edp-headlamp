import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeEDPComponentDetails = {
  name: 'Components',
  path: '/edp/configuration/edpcomponents/:namespace/:name/',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
};
