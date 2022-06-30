import { EDPApplication } from '../pages/edp-application';
import { EDPApplications } from '../pages/edp-applications';
import { EDPAutotest } from '../pages/edp-autotest';
import { EDPAutotests } from '../pages/edp-autotests';
import { EDPComponents } from '../pages/edp-components';
import { EDPLibraries } from '../pages/edp-libraries';
import { EDPLibrary } from '../pages/edp-library';
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
        component: () => <EDPLibraries />,
    },
    [LIBRARY_ROUTE_NAME]: {
        name: 'EDP Library',
        path: createRouteNameBasedOnNameAndNamespace(LIBRARIES_ROUTE_NAME),
        sidebar: createSidebarItemName(LIBRARIES_ROUTE_NAME),
        component: () => <EDPLibrary />,
    },
    [APPLICATIONS_ROUTE_NAME]: {
        name: 'EDP Applications',
        path: createRouteName(APPLICATIONS_ROUTE_NAME),
        sidebar: createSidebarItemName(APPLICATIONS_ROUTE_NAME),
        exact: true,
        component: () => <EDPApplications />,
    },
    [APPLICATION_ROUTE_NAME]: {
        name: 'EDP Application',
        path: createRouteNameBasedOnNameAndNamespace(APPLICATIONS_ROUTE_NAME),
        sidebar: createSidebarItemName(APPLICATIONS_ROUTE_NAME),
        component: () => <EDPApplication />,
    },
    [AUTOTESTS_ROUTE_NAME]: {
        name: 'EDP Autotests',
        path: createRouteName(AUTOTESTS_ROUTE_NAME),
        sidebar: createSidebarItemName(AUTOTESTS_ROUTE_NAME),
        exact: true,
        component: () => <EDPAutotests />,
    },
    [AUTOTEST_ROUTE_NAME]: {
        name: 'EDP Autotest',
        path: createRouteNameBasedOnNameAndNamespace(AUTOTESTS_ROUTE_NAME),
        sidebar: createSidebarItemName(AUTOTESTS_ROUTE_NAME),
        component: () => <EDPAutotest />,
    },
    [COMPONENTS_ROUTE_NAME]: {
        name: 'EDP Components',
        path: createRouteName(COMPONENTS_ROUTE_NAME),
        sidebar: createSidebarItemName(COMPONENTS_ROUTE_NAME),
        exact: true,
        component: () => <EDPComponents />,
    },
};
