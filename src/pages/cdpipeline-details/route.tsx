import { DEPLOYMENT_FLOWS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeCDPipelineDetails = {
  name: 'Deployment Flow Details',
  path: '/deployment-flows/:namespace/:name',
  sidebar: createSidebarItemName(DEPLOYMENT_FLOWS_ROUTE_NAME),
  exact: true,
};
