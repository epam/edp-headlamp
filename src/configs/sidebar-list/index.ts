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
            icon: 'ion:rocket-outline',
        },
    },
    createNewSidebarItem(
        'Overview',
        COMPONENTS_ROUTE_NAME,
        'material-symbols:view-quilt-outline-rounded',
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'CD Pipelines',
        CDPIPELINES_ROUTE_NAME,
        'ion:infinite-outline',
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Applications',
        APPLICATIONS_ROUTE_NAME,
        'fluent:app-generic-24-regular',
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Autotests',
        AUTOTESTS_ROUTE_NAME,
        'file-icons:test-generic',
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
    createNewSidebarItem(
        'Libraries',
        LIBRARIES_ROUTE_NAME,
        'fluent:library-16-regular',
        createSidebarItemName(EDP_ROOT_ROUTE_NAME)
    ),
];
