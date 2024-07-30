import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeCDPipelineList = {
  name: 'Environments',
  path: `/cdpipelines`,
  sidebar: createSidebarItemName(CDPIPELINES_ROUTE_NAME),
  exact: true,
};
