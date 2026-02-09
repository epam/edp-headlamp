import { DEPLOYMENT_FLOWS_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeCDPipelineList = {
  name: 'Deployment Flows',
  path: `/deployment-flows`,
  sidebar: createSidebarItemName(DEPLOYMENT_FLOWS_ROUTE_NAME),
  exact: true,
};
