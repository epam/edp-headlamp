import { COMPONENTS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPComponentDetails = {
    name: 'Component Details',
    path: `/edp/components/:namespace/:name/`,
    sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
    component: () => <Page />,
};
