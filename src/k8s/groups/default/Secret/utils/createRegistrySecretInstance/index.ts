import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { safeEncode } from '../../../../../../utils/decodeEncode';
import { SECRET_LABEL_INTEGRATION_SECRET, SECRET_LABEL_SECRET_TYPE } from '../../labels';

export const createRegistrySecretInstance = ({
  name,
  registryEndpoint,
  user,
  password,
}: {
  name: string;
  registryEndpoint: string;
  user: string;
  password: string;
}): KubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'registry',
        [SECRET_LABEL_INTEGRATION_SECRET]: 'true',
      },
    },
    type: 'kubernetes.io/dockerconfigjson',
    data: {
      '.dockerconfigjson': safeEncode(
        JSON.stringify({
          auths: {
            [registryEndpoint]: {
              username: user,
              password: password,
              auth: safeEncode(`${user}:${password}`),
            },
          },
        })
      ),
    },
  };
};

export const createECRPushSecretInstance = ({ name }: { name: string }): KubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'registry',
      },
    },
    type: 'kubernetes.io/dockerconfigjson',
    data: {
      '.dockerconfigjson': safeEncode(
        JSON.stringify({
          credsStore: 'ecr-login',
        })
      ),
    },
  };
};

export const createOpenshiftPushSecretInstance = ({
  name,
  registryEndpoint,
  token,
}: {
  name: string;
  registryEndpoint: string;
  token: string;
}): KubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'registry',
      },
    },
    type: 'kubernetes.io/dockerconfigjson',
    data: {
      '.dockerconfigjson': safeEncode(
        JSON.stringify({
          auths: {
            [registryEndpoint]: {
              auth: safeEncode(token),
            },
          },
        })
      ),
    },
  };
};
