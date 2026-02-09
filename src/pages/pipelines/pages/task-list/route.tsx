import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeTaskList = {
  name: 'Tasks',
  path: '/pipelines/tasks',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
