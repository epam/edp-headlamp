import { createSidebarItemName } from '../../utils/routes/createSidebarItemName';

export const routeEDPPipelineList = {
  name: 'Pipelines',
  path: '/pipelines',
  sidebar: createSidebarItemName('pipelines'),
  exact: true,
};
