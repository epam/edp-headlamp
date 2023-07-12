import React from 'react';
import { MARKETPLACE_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPMarketplace = {
    name: 'edp-marketplace',
    path: `/edp/marketplace`,
    sidebar: createSidebarItemName(MARKETPLACE_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
