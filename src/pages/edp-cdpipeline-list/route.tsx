import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPCDPipelineList = {
    name: 'Environments',
    path: `/edp/cdpipelines`,
    sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
    exact: true,
};
