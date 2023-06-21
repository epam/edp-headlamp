import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPComponentDetails = {
    name: 'edp-component-details',
    path: `/edp/components/:namespace/:name/`,
    sidebar: createSidebarItemName('components'),
    component: () => <Page />,
};
