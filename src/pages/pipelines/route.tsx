import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routePipelineList = {
  name: 'Pipelines',
  path: '/pipelines',
  sidebar: createSidebarItemName('pipelines'),
  exact: true,
};
