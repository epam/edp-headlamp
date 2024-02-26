import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeQuickLinkDetails = {
  name: 'Components',
  path: '/configuration/quicklinks/:namespace/:name/',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
};
