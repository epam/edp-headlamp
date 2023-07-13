import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPStageDetails = {
    name: 'Stage Details',
    path: '/edp/cdpipelines/:namespace/:CDPipelineName/stages/:stageName',
    sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
    component: () => <Page />,
};
