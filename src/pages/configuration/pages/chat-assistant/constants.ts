import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { QuickLinkKubeObject } from '../../../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../../../k8s/groups/EDP/QuickLink/config';
import { PageDescription } from '../../../../types/pages';
import { routeChatAssitant } from './route';

export const pageDescription: PageDescription = {
  id: 'chat-assistant-integration',
  label: 'Chat Assistant',
  description: 'Configure Chat Assistant integration.',
  routePath: routeChatAssitant.path,
};

export const pagePermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: QuickLinkKubeObject as unknown as KubeObjectClass,
      config: QuickLinkKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
};
