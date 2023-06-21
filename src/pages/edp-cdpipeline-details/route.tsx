import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPCDPipelineDetails = {
    name: 'edp-stage-details',
    path: '/edp/cdpipelines/:namespace/:name',
    sidebar: createSidebarItemName('cdpipelines'),
    component: () => <Page />,
    exact: true,
};
