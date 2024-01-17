import { INTEGRATION_SECRET_NAMES } from '../constants';

/*
 * Encoded data
 * token: test-token
 * url: https://test-url.com
 *
 * */

export const ArgoCDCISecretMock = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: INTEGRATION_SECRET_NAMES.ARGO_CD,
        labels: {
            'app.edp.epam.com/secret-type': 'argocd',
            'app.edp.epam.com/integration-secret': 'true',
        },
    },
    data: {
        token: 'dGVzdC10b2tlbg==',
        url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
    },
    type: 'Opaque',
};

export const ArgoCDCISecretWithOwnerMock = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: INTEGRATION_SECRET_NAMES.ARGO_CD,
        labels: {
            'app.edp.epam.com/secret-type': 'argocd',
        },
        ownerReferences: [
            {
                apiVersion: 'apiVersion',
                kind: 'ExternalSecret',
                name: INTEGRATION_SECRET_NAMES.ARGO_CD,
                uid: 'test-uid',
                controller: true,
                blockOwnerDeletion: true,
            },
        ],
    },
    immutable: false,
    data: {
        token: 'dGVzdC10b2tlbg==',
        url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
    },
    type: 'Opaque',
};
