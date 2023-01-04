import { ICONS } from '../constants/icons';
import { createNewSidebarItem } from '../utils/routes/createNewSidebarItem';
import { createRouteName } from '../utils/routes/createRouteName';
import { createSidebarItemName } from '../utils/routes/createSidebarItemName';
import {
    CDPIPELINES_ROUTE_NAME,
    COMPONENTS_ROUTE_NAME,
    EDP_ROOT_ROUTE_NAME,
    GIT_SERVERS_ROUTE_NAME,
    OVERVIEW_ROUTE_NAME,
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
        OVERVIEW_ROUTE_NAME,
        ICONS['PANEL'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Components',
        COMPONENTS_ROUTE_NAME,
        ICONS['APPLICATION'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'CD Pipelines',
        CDPIPELINES_ROUTE_NAME,
        ICONS['INFINITY'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Git Servers',
        GIT_SERVERS_ROUTE_NAME,
        ICONS['REPOSITORY'],
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
];
