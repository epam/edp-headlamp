import { PIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routePipelineRunHistoryList = {
  name: 'PipelineRunHistoryList',
  path: '/pipelines/history',
  sidebar: createSidebarItemName(PIPELINES_ROUTE_NAME),
  exact: true,
};
