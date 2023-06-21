import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPGitServerList = {
    name: 'edp-git-server-list',
    path: `/edp/gitservers`,
    sidebar: createSidebarItemName('gitservers'),
    component: () => <Page />,
    exact: true,
};
