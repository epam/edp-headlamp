import React from 'react';
import { CONFIGURATION_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPGitServerDetails = {
    name: 'Git Server Details',
    path: `/edp/gitservers/:namespace/:name/`,
    sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    component: () => <Page />,
};
