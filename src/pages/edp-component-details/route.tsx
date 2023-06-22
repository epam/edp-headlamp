import { React } from '../../plugin.globals';
import { COMPONENTS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPComponentDetails = {
    name: 'edp-component-details',
    path: `/edp/components/:namespace/:name/`,
    sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
    component: () => <Page />,
};
