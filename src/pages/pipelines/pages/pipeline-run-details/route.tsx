import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routePipelineRunDetails = {
  name: 'PipelineRun Details',
  path: '/pipelines/pipelineruns/:namespace/:name',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
