import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPGitServerDetails = {
    name: 'edp-git-server-details',
    path: `/edp/gitservers/:namespace/:name/`,
    sidebar: createSidebarItemName('gitservers'),
    component: () => <Page />,
};
