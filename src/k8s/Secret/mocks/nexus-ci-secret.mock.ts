import { INTEGRATION_SECRET_NAMES } from '../constants';

/*
 * Encoded data
 * username: test-username
 * password: test-password
 * url: https://test-url.com
 *
 * */

export const NexusCISecretMock = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: INTEGRATION_SECRET_NAMES.NEXUS,
        labels: {
            'app.edp.epam.com/secret-type': 'nexus',
            'app.edp.epam.com/integration-secret': 'true',
        },
    },
    type: 'Opaque',
    data: {
        username: 'dGVzdC11c2VybmFtZQ==',
        password: 'dGVzdC1wYXNzd29yZA==',
        url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
    },
};

export const NexusCISecretWithOwnerMock = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: INTEGRATION_SECRET_NAMES.NEXUS,
        labels: {
            'app.edp.epam.com/secret-type': 'nexus',
            'app.edp.epam.com/integration-secret': 'true',
        },
        ownerReferences: [
            {
                apiVersion: 'apiVersion',
                kind: 'ExternalSecret',
                name: INTEGRATION_SECRET_NAMES.NEXUS,
                uid: 'test-uid',
                controller: true,
                blockOwnerDeletion: true,
            },
        ],
    },
    type: 'Opaque',
    data: {
        username: 'dGVzdC11c2VybmFtZQ==',
        password: 'dGVzdC1wYXNzd29yZA==',
        url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
    },
};
