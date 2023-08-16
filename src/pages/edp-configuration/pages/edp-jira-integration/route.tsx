import React from 'react';
import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPJiraIntegration = {
    name: 'Jira Integration',
    path: '/edp/configuration/jira-integration',
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
