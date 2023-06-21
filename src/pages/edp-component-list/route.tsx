import { React } from '../../plugin.globals';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPComponentList = {
    name: 'edp-component-list',
    path: `/edp/components`,
    sidebar: createSidebarItemName('components'),
    component: () => <Page />,
    exact: true,
};
