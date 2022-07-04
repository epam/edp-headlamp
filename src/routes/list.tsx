import { EDPApplicationDetails } from '../pages/edp-application-details';
import { EDPApplicationList } from '../pages/edp-application-list';
import { EDPAutotestDetails } from '../pages/edp-autotest-details';
import { EDPAutotestList } from '../pages/edp-autotest-list';
import { EDPCDPipelineDetails } from '../pages/edp-cdpipeline-details';
import { EDPCDPipelineList } from '../pages/edp-cdpipeline-list';
import { EDPComponentList } from '../pages/edp-component-list';
import { EDPLibraryDetails } from '../pages/edp-library-details';
import { EDPLibraryList } from '../pages/edp-library-list';
import {
    createRouteName,
    createRouteNameBasedOnNameAndNamespace,
} from '../utils/routes/createRouteName';
import { createSidebarItemName } from '../utils/routes/createSidebarItemName';
import {
    APPLICATION_ROUTE_NAME,
    APPLICATIONS_ROUTE_NAME,
    AUTOTEST_ROUTE_NAME,
    AUTOTESTS_ROUTE_NAME,
    CDPIPELINE_ROUTE_NAME,
    CDPIPELINES_ROUTE_NAME,
    COMPONENTS_ROUTE_NAME,
    LIBRARIES_ROUTE_NAME,
    LIBRARY_ROUTE_NAME,
} from './names';

const {
    pluginLib: { React },
} = globalThis;

export const List: {
    [routeName: string]: any;
} = {
    [LIBRARIES_ROUTE_NAME]: {
        name: 'EDP Libraries',
        path: createRouteName(LIBRARIES_ROUTE_NAME),
        sidebar: createSidebarItemName(LIBRARIES_ROUTE_NAME),
        exact: true,
        component: () => <EDPLibraryList />,
    },
    [LIBRARY_ROUTE_NAME]: {
        name: 'EDP Library',
        path: createRouteNameBasedOnNameAndNamespace(LIBRARIES_ROUTE_NAME),
        sidebar: createSidebarItemName(LIBRARIES_ROUTE_NAME),
        component: () => <EDPLibraryDetails />,
    },
    [APPLICATIONS_ROUTE_NAME]: {
        name: 'EDP Applications',
        path: createRouteName(APPLICATIONS_ROUTE_NAME),
        sidebar: createSidebarItemName(APPLICATIONS_ROUTE_NAME),
        exact: true,
        component: () => <EDPApplicationList />,
    },
    [APPLICATION_ROUTE_NAME]: {
        name: 'EDP Application',
        path: createRouteNameBasedOnNameAndNamespace(APPLICATIONS_ROUTE_NAME),
        sidebar: createSidebarItemName(APPLICATIONS_ROUTE_NAME),
        component: () => <EDPApplicationDetails />,
    },
    [AUTOTESTS_ROUTE_NAME]: {
        name: 'EDP Autotests',
        path: createRouteName(AUTOTESTS_ROUTE_NAME),
        sidebar: createSidebarItemName(AUTOTESTS_ROUTE_NAME),
        exact: true,
        component: () => <EDPAutotestList />,
    },
    [AUTOTEST_ROUTE_NAME]: {
        name: 'EDP Autotest',
        path: createRouteNameBasedOnNameAndNamespace(AUTOTESTS_ROUTE_NAME),
        sidebar: createSidebarItemName(AUTOTESTS_ROUTE_NAME),
        component: () => <EDPAutotestDetails />,
    },
    [COMPONENTS_ROUTE_NAME]: {
        name: 'EDP Components',
        path: createRouteName(COMPONENTS_ROUTE_NAME),
        sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
        exact: true,
        component: () => <EDPComponentList />,
    },
    [CDPIPELINES_ROUTE_NAME]: {
        name: 'EDP CD Pipelines',
        path: createRouteName(CDPIPELINES_ROUTE_NAME),
        sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
        exact: true,
        component: () => <EDPCDPipelineList />,
    },
    [CDPIPELINE_ROUTE_NAME]: {
        name: 'EDP CD Pipeline',
        path: createRouteNameBasedOnNameAndNamespace(CDPIPELINES_ROUTE_NAME),
        sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
        component: () => <EDPCDPipelineDetails />,
    },
};
