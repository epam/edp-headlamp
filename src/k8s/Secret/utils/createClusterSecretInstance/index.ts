import { safeEncode } from '../../../../utils/decodeEncode';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../labels';
import { SecretKubeObjectInterface } from '../../types';

export const createClusterConfig = (url: string, token: string) => {
  return {
    apiVersion: 'v1',
    kind: 'Config',
    'current-context': 'default-context',
    preferences: {},
    clusters: [
      {
        cluster: {
          server: url,
        },
        name: 'default-cluster',
      },
    ],
    contexts: [
      {
        context: {
          cluster: 'default-cluster',
          user: 'default-user',
        },
        name: 'default-context',
      },
    ],
    users: [
      {
        user: {
          token: token,
        },
        name: 'default-user',
      },
    ],
  };
};

export const createClusterSecretInstance = ({
  clusterName,
  clusterHost,
  clusterToken,
}: {
  clusterName: string;
  clusterHost: string;
  clusterToken: string;
}): SecretKubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: clusterName,
      labels: {
        [ARGO_CD_SECRET_LABEL_SECRET_TYPE]: 'cluster',
      },
    },
    data: {
      config: safeEncode(JSON.stringify(createClusterConfig(clusterHost, clusterToken))),
    },
  };
};
