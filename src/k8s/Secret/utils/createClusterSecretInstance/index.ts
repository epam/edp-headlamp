import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../labels';
import { SecretKubeObjectInterface } from '../../types';

export const createClusterSecretInstance = ({
  clusterName,
  clusterHost,
  clusterToken,
  clusterCertificate,
}: {
  clusterName: string;
  clusterHost: string;
  clusterToken: string;
  clusterCertificate: string;
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
    type: 'Opaque',
    stringData: {
      name: clusterName,
      server: clusterHost,
      config: JSON.stringify({
        tlsClientConfig: {
          insecure: false,
          caData: clusterCertificate,
        },
        bearerToken: clusterToken,
      }),
    },
  };
};
