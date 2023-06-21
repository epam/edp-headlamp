import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPCDPipelineList = {
    name: 'edp-cd-pipeline-list',
    path: `/edp/cdpipelines`,
    sidebar: createSidebarItemName('cdpipelines'),
    component: () => <Page />,
    exact: true,
};
