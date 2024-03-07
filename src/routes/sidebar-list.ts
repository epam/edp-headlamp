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
      icon: 'material-symbols:space-dashboard',
    },
  },
  createNewSidebarItem('Marketplace', MARKETPLACE_ROUTE_NAME, 'material-symbols:shopping-cart'),
  createNewSidebarItem('Components', COMPONENTS_ROUTE_NAME, 'material-symbols:layers'),
  createNewSidebarItem(
    'Environments',
    CDPIPELINES_ROUTE_NAME,
    'material-symbols:view-stream-rounded'
  ),
  {
    parentName: null,
    itemLabel: 'Configuration',
    itemName: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
    url: routeQuickLinkList.path,
    opts: {
      icon: 'material-symbols:settings',
    },
  },
];
