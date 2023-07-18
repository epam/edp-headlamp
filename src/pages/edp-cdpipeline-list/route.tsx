import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPCDPipelineList = {
    name: 'Environments',
    path: `/edp/cdpipelines`,
    sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
