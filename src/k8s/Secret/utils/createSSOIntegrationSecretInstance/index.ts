import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { safeEncode } from '../../../../utils/decodeEncode';
import { INTEGRATION_SECRET_NAMES } from '../../constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createSSOIntegrationSecretInstance = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): KubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: INTEGRATION_SECRET_NAMES.SSO,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'keycloak',
      },
    },
    type: 'Opaque',
    data: {
      username: safeEncode(username),
      password: safeEncode(password),
    },
  };
};
