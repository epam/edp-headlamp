import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routePipelineDetails = {
  name: 'Pipeline Details',
  path: '/pipelines/pipelines/:namespace/:name',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
