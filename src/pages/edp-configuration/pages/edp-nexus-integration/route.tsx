import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeEDPNexusIntegration = {
    name: 'Nexus Integration',
    path: `/edp/configuration/nexus-integration`,
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    exact: true,
};
