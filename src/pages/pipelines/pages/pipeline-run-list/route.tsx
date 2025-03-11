import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routePipelineRunList = {
  name: 'PipelineRuns',
  path: '/pipelines/pipelineruns',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
