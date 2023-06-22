import { React } from '../../plugin.globals';
import { GIT_SERVERS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPGitServerDetails = {
    name: 'edp-git-server-details',
    path: `/edp/gitservers/:namespace/:name/`,
    sidebar: createSidebarItemName(GIT_SERVERS_ROUTE_NAME),
    component: () => <Page />,
};
