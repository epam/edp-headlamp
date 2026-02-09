import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routePipelineList = {
  name: 'Pipelines',
  path: '/pipelines/pipelines',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
