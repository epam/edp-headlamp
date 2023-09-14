import React from 'react';
import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPComponentList = {
    name: 'Components',
    path: '/edp/configuration/edpcomponents',
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
