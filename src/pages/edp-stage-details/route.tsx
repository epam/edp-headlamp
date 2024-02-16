import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPStageDetails = {
  name: 'Stage Details',
  path: '/cdpipelines/:namespace/:CDPipelineName/stages/:stageName',
  sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
};
