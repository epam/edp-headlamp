import { safeEncode } from '../../../../../../utils/decodeEncode';
import { SECRET_LABEL_CLUSTER_TYPE, SECRET_LABEL_SECRET_TYPE } from '../../labels';
import { SecretKubeObjectInterface } from '../../types';

export const createBearerClusterSecretInstance = (
  props:
    | {
        clusterName: string;
        clusterHost: string;
        clusterToken: string;
        skipTLSVerify: true;
      }
    | {
        clusterName: string;
        clusterHost: string;
        clusterToken: string;
        skipTLSVerify: false;
        clusterCertificate: string;
      }
): SecretKubeObjectInterface => {
  const { clusterName, clusterHost, clusterToken, skipTLSVerify } = props;

  const clusterCertificate = 'clusterCertificate' in props ? props.clusterCertificate : undefined;

  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: clusterName,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'cluster',
        [SECRET_LABEL_CLUSTER_TYPE]: 'bearer',
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
              name: clusterName,
            },
          ],
          contexts: [
            {
              context: {
                cluster: clusterName,
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

export const createIRSAClusterSecretInstance = ({
  clusterName,
  clusterHost,
  roleARN,
  caData,
  isEdit = false,
}: {
  clusterName: string;
  clusterHost: string;
  roleARN: string;
  caData: string;
  isEdit?: boolean;
}): SecretKubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: isEdit ? clusterName : `${clusterName}-cluster`,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'cluster',
        [SECRET_LABEL_CLUSTER_TYPE]: 'irsa',
        'argocd.argoproj.io/secret-type': 'cluster',
      },
    },
    data: {
      config: safeEncode(
        JSON.stringify({
          server: clusterHost,
          awsAuthConfig: {
            clusterName,
            roleARN,
          },
          tlsClientConfig: {
            insecure: false,
            caData,
          },
        })
      ),
      name: safeEncode(clusterName),
      server: safeEncode(clusterHost),
    },
  };
};
