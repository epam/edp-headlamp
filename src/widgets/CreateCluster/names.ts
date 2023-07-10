const NAME_CLUSTER_NAME = 'clusterName' as const;
const NAME_CLUSTER_HOST = 'clusterHost' as const;
const NAME_CLUSTER_CERTIFICATE = 'clusterCertificate' as const;
const NAME_CLUSTER_TOKEN = 'clusterToken' as const;

export const CLUSTER_CREATION_FORM_NAMES = {
    [NAME_CLUSTER_NAME]: {
        name: NAME_CLUSTER_NAME,
        path: ['stringData', 'name'],
    },
    [NAME_CLUSTER_HOST]: {
        name: NAME_CLUSTER_HOST,
        path: ['stringData', 'server'],
    },
    [NAME_CLUSTER_CERTIFICATE]: {
        name: NAME_CLUSTER_CERTIFICATE,
        path: ['stringData', 'config', 'tlsClientConfig', 'caData'],
    },
    [NAME_CLUSTER_TOKEN]: {
        name: NAME_CLUSTER_TOKEN,
        path: ['stringData', 'config', 'bearerToken'],
    },
};
