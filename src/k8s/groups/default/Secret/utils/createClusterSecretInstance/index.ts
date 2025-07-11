import { safeEncode } from '../../../../../../utils/decodeEncode';
import { SECRET_LABEL_CLUSTER_TYPE, SECRET_LABEL_SECRET_TYPE } from '../../labels';
import { SecretKubeObjectInterface } from '../../types';

export const createBearerClusterSecretInstance = (
  props:
    | {
        clusterMetadataName: string;
        clusterName: string;
        clusterHost: string;
        clusterToken: string;
        skipTLSVerify: true;
      }
    | {
        clusterMetadataName: string;
        clusterName: string;
        clusterHost: string;
        clusterToken: string;
        skipTLSVerify: false;
        clusterCertificate: string;
      }
): SecretKubeObjectInterface => {
  const { clusterMetadataName, clusterName, clusterHost, clusterToken, skipTLSVerify } = props;

  const clusterCertificate = 'clusterCertificate' in props ? props.clusterCertificate : undefined;

  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: clusterMetadataName,
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
  clusterMetadataName,
  clusterName,
  clusterHost,
  roleARN,
  caData,
}: {
  clusterMetadataName: string;
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
      name: clusterMetadataName,
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
