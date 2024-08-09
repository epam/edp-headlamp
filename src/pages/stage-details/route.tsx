import { DEPLOYMENT_FLOWS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeStageDetails = {
  name: 'Environment Details',
  path: '/deployment-flows/:namespace/:CDPipelineName/environments/:stageName',
  sidebar: createSidebarItemName(DEPLOYMENT_FLOWS_ROUTE_NAME),
};
