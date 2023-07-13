import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPOverviewList = {
    name: 'Overview',
    path: `/edp/overview`,
    sidebar: createSidebarItemName('overview'),
    component: () => <Page />,
    exact: true,
};
