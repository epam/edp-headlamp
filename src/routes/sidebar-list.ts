import { ICONS } from '../constants/icons';
import { createNewSidebarItem } from '../utils/routes/createNewSidebarItem';
import { createRouteName } from '../utils/routes/createRouteName';
import { createSidebarItemName } from '../utils/routes/createSidebarItemName';
import {
    APPLICATIONS_ROUTE_NAME,
    AUTOTESTS_ROUTE_NAME,
    CDPIPELINES_ROUTE_NAME,
    COMPONENTS_ROUTE_NAME,
    EDP_ROOT_ROUTE_NAME,
    LIBRARIES_ROUTE_NAME,
} from './names';
import { SidebarItem } from './types';

export const SIDEBAR_LIST: SidebarItem[] = [
    {
        parentName: null,
        itemLabel: 'EDP',
        itemName: createSidebarItemName(EDP_ROOT_ROUTE_NAME),
        url: createRouteName(COMPONENTS_ROUTE_NAME),
        opts: {
            icon: ICONS['ROCKET'],
        },
    },
    createNewSidebarItem(
        'Overview',
        COMPONENTS_ROUTE_NAME,
        ICONS['PANEL'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'CD Pipelines',
        CDPIPELINES_ROUTE_NAME,
        ICONS['INFINITY'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Applications',
        APPLICATIONS_ROUTE_NAME,
        ICONS['APPLICATION'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Autotests',
        AUTOTESTS_ROUTE_NAME,
        ICONS['TEST_APPLICATION'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Libraries',
        LIBRARIES_ROUTE_NAME,
        ICONS['BOOKS'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
];
