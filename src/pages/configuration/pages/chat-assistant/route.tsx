import { CONFIGURATION_ROUTE_NAME } from '../../../../routes/names';
import { createSidebarItemName } from '../../../../utils/routes/createSidebarItemName';

export const routeChatAssitant = {
  name: 'CodeMie Integration',
  path: '/configuration/chat-assitant-integration',
  sidebar: createSidebarItemName(CONFIGURATION_ROUTE_NAME),
  exact: true,
};
