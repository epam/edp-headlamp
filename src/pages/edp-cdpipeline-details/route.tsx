import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPCDPipelineDetails = {
    name: 'CD Pipeline Details',
    path: '/edp/cdpipelines/:namespace/:name',
    sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
    exact: true,
};
