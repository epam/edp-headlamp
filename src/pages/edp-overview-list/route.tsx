import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPOverviewList = {
    name: 'edp-overview-list',
    path: `/edp/overview`,
    sidebar: createSidebarItemName('overview'),
    component: () => <Page />,
    exact: true,
};
