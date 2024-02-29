import { safeEncode } from '../../../../utils/decodeEncode';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../labels';
import { SecretKubeObjectInterface } from '../../types';

export const createClusterSecretInstance = ({
  clusterName,
  clusterHost,
  clusterToken,
  clusterCertificate,
  skipTLSVerify,
}: {
  clusterName: string;
  clusterHost: string;
  clusterToken: string;
  clusterCertificate: string;
  skipTLSVerify: boolean;
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
      config: safeEncode(
        JSON.stringify({
          apiVersion: 'v1',
          kind: 'Config',
          'current-context': 'default-context',
          preferences: {},
          clusters: [
            {
              cluster: {
                server: clusterHost,
                ...(skipTLSVerify && { 'insecure-skip-tls-verify': true }),
                ...(clusterCertificate &&
                  !skipTLSVerify && { 'certificate-authority-data': clusterCertificate }),
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
                token: clusterToken,
              },
              name: 'default-user',
            },
          ],
        })
      ),
    },
  };
};
