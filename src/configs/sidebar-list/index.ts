import {
    ICON_APPLICATION,
    ICON_BOOKS,
    ICON_INFINITY,
    ICON_PANEL,
    ICON_ROCKET,
    ICON_TEST_APPLICATION,
} from '../../constants/icons';
import {
    APPLICATIONS_ROUTE_NAME,
    AUTOTESTS_ROUTE_NAME,
    CDPIPELINES_ROUTE_NAME,
    COMPONENTS_ROUTE_NAME,
    EDP_ROOT_ROUTE_NAME,
    LIBRARIES_ROUTE_NAME,
} from '../../routes/names';
import { SidebarItem } from '../../routes/types';
import { createNewSidebarItem } from '../../utils/routes/createNewSidebarItem';
import { createRouteName } from '../../utils/routes/createRouteName';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const SIDEBAR_LIST: SidebarItem[] = [
    {
        parentName: null,
        itemLabel: 'EDP',
        itemName: createSidebarItemName(EDP_ROOT_ROUTE_NAME),
        url: createRouteName(COMPONENTS_ROUTE_NAME),
        opts: {
            icon: ICON_ROCKET,
        },
    },
    createNewSidebarItem(
        'Overview',
        COMPONENTS_ROUTE_NAME,
        ICON_PANEL,
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'CD Pipelines',
        CDPIPELINES_ROUTE_NAME,
        ICON_INFINITY,
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Applications',
        APPLICATIONS_ROUTE_NAME,
        ICON_APPLICATION,
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Autotests',
        AUTOTESTS_ROUTE_NAME,
        ICON_TEST_APPLICATION,
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Libraries',
        LIBRARIES_ROUTE_NAME,
        ICON_BOOKS,
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
];
