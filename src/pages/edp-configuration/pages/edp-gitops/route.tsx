import React from 'react';
import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPGitOpsConfiguration = {
    name: 'GitOps Configuration',
    path: '/edp/configuration/gitops',
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
