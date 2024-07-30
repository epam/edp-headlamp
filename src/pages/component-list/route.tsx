import { COMPONENTS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeComponentList = {
  name: 'Components',
  path: `/components`,
  sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
  exact: true,
};
