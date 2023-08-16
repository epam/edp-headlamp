import React from 'react';
import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPDefectDojoIntegration = {
    name: 'DefectDojo Integration',
    path: '/edp/configuration/defect-dojo-integration',
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
