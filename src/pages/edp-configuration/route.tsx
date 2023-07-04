import { React } from '../../plugin.globals';
import { CONFIGURATION_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPConfiguration = {
    name: 'edp-configuration',
    path: `/edp/configuration`,
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
