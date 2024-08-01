import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeDefectDojo = {
  name: 'DefectDojo Integration',
  path: '/configuration/defect-dojo-integration',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
  exact: true,
};
