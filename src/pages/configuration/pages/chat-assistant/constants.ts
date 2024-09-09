import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { PageDescription } from '../../../../types/pages';
import { routeChatAssitant } from './route';

export const pageDescription: PageDescription = {
  id: 'chat-assistant-integration',
  label: 'Chat Assistant',
  description: 'Configure Chat Assistant integration.',
  routePath: routeChatAssitant.path,
};

export const permissionsToCheckConfig = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
