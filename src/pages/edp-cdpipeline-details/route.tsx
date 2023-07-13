import React from 'react';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';
import Page from './page';

export const routeEDPCDPipelineDetails = {
    name: 'CD Pipeline Details',
    path: '/edp/cdpipelines/:namespace/:name',
    sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
    component: () => <Page />,
    exact: true,
};
