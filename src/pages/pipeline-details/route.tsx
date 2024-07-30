import { PIPELINES_ROUTE_NAME } from '../../routes/names';
import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routePipelineDetails = {
  name: 'PipelineRun Details',
  path: '/pipelines/:namespace/:name',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
