import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { safeEncode } from '../../../../../../utils/decodeEncode';
import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { SECRET_LABEL_INTEGRATION_SECRET, SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createChatAssistantIntegrationSecretInstance = ({
  apiUrl,
  assistantId,
  token,
}: {
  apiUrl: string;
  assistantId: string;
  token: string;
}): KubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: INTEGRATION_SECRET_NAMES.CODEMIE,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'chat-assistant',
        [SECRET_LABEL_INTEGRATION_SECRET]: 'true',
      },
    },
    type: 'Opaque',
    data: {
      apiUrl: safeEncode(apiUrl),
      assistantId: safeEncode(assistantId),
      token: safeEncode(token),
    },
  };
};
