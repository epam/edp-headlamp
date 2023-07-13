import { COMPONENTS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPComponentList = {
    name: 'Components',
    path: `/edp/components`,
    sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
