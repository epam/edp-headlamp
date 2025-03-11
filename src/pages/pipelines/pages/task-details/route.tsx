import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeTaskDetails = {
  name: 'Task Details',
  path: '/pipelines/tasks/:namespace/:name',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
