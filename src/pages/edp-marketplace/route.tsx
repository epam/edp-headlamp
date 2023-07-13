import React from 'react';
import { MARKETPLACE_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPMarketplace = {
    name: 'Marketplace',
    path: `/edp/marketplace`,
    sidebar: createSidebarItemName(MARKETPLACE_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
