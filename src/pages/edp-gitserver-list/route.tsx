import { React } from '../../plugin.globals';
import { GIT_SERVERS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPGitServerList = {
    name: 'edp-git-server-list',
    path: `/edp/gitservers`,
    sidebar: createSidebarItemName(GIT_SERVERS_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
