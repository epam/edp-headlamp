const NAMES = {
  CLUSTER_NAME: 'clusterName',
  CLUSTER_HOST: 'clusterHost',
  CLUSTER_CERTIFICATE: 'clusterCertificate',
  CLUSTER_TOKEN: 'clusterToken',
  SKIP_TLS_VERIFY: 'skipTLSVerify',
} as const;

export const CLUSTER_CREATION_FORM_NAMES = {
  [NAMES.CLUSTER_NAME]: {
    name: NAMES.CLUSTER_NAME,
    path: ['stringData', 'name'],
  },
  [NAMES.CLUSTER_HOST]: {
    name: NAMES.CLUSTER_HOST,
    path: ['stringData', 'server'],
  },
  [NAMES.CLUSTER_CERTIFICATE]: {
    name: NAMES.CLUSTER_CERTIFICATE,
    path: ['stringData', 'config', 'tlsClientConfig', 'caData'],
  },
  [NAMES.CLUSTER_TOKEN]: {
    name: NAMES.CLUSTER_TOKEN,
    path: ['stringData', 'config', 'bearerToken'],
  },
  [NAMES.SKIP_TLS_VERIFY]: {
    name: NAMES.SKIP_TLS_VERIFY,
  },
};
