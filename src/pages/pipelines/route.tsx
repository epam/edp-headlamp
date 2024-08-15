import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routePipelineRunList = {
  name: 'Pipelines',
  path: '/pipelines',
  sidebar: createSidebarItemName('pipelines'),
  exact: true,
};
