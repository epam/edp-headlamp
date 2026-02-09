import { routeQuickLinkList } from '../pages/configuration/pages/quicklinks/route';
import { routePipelineRunList } from '../pages/pipelines/pages/pipeline-run-list/route';
import { createNewSidebarItem } from '../utils/routes/createNewSidebarItem';
import { createSidebarItemName } from '../utils/routes/createSidebarItemName';
import {
  COMPONENTS_ROUTE_NAME,
  CONFIGURATION_ROUTE_NAME,
  DEPLOYMENT_FLOWS_ROUTE_NAME,
  MARKETPLACE_ROUTE_NAME,
} from './names';
import { SidebarItem } from './types';

export const SIDEBAR_LIST: SidebarItem[] = [
  {
    parentName: null,
    itemLabel: 'Overview',
    itemName: createSidebarItemName('overview'),
    url: '/overview',
    opts: {
      icon: 'material-symbols:space-dashboard',
    },
  },
  {
    parentName: null,
    itemLabel: 'Pipelines',
    itemName: createSidebarItemName('pipelines'),
    url: routePipelineRunList.path,
    opts: {
      icon: 'fluent:pipeline-20-filled',
    },
  },
  createNewSidebarItem('Marketplace', MARKETPLACE_ROUTE_NAME, 'material-symbols:shopping-cart'),
  createNewSidebarItem('Components', COMPONENTS_ROUTE_NAME, 'material-symbols:layers'),
  createNewSidebarItem(
    'Deployment Flows',
    DEPLOYMENT_FLOWS_ROUTE_NAME,
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
