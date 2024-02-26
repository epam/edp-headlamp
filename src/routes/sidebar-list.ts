import { ICONS } from '../icons/iconify-icons-mapping';
import { routeQuickLinkList } from '../pages/edp-configuration/pages/edp-quick-link-list/route';
import { createNewSidebarItem } from '../utils/routes/createNewSidebarItem';
import { createSidebarItemName } from '../utils/routes/createSidebarItemName';
import {
  CDPIPELINES_ROUTE_NAME,
  COMPONENTS_ROUTE_NAME,
  CONFIGURATION_ROUTE_NAME,
  MARKETPLACE_ROUTE_NAME,
} from './names';
import { SidebarItem } from './types';

export const SIDEBAR_LIST: SidebarItem[] = [
  {
    parentName: null,
    itemLabel: 'Overview',
    itemName: createSidebarItemName('overview'),
    url: '/',
    opts: {
      icon: ICONS.PANEL,
    },
  },
  createNewSidebarItem('Marketplace', MARKETPLACE_ROUTE_NAME, ICONS.BASKET),
  createNewSidebarItem('Components', COMPONENTS_ROUTE_NAME, ICONS.APPLICATION),
  createNewSidebarItem('Environments', CDPIPELINES_ROUTE_NAME, ICONS.INFINITY),
  {
    parentName: null,
    itemLabel: 'Configuration',
    itemName: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    url: routeQuickLinkList.path,
    opts: {
      icon: ICONS.SETTINGS,
    },
  },
];
