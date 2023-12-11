import { INTEGRATION_SECRET_NAMES } from '../constants';

/*
 * Encoded data
 * username: test-username
 * password: test-password
 *
 * */

export const JiraCISecretMock = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: INTEGRATION_SECRET_NAMES.JIRA,
        labels: {
            'app.edp.epam.com/secret-type': 'jira',
            'app.edp.epam.com/integration-secret': 'true',
        },
    },
    type: 'Opaque',
    data: {
        username: 'dGVzdC11c2VybmFtZQ==',
        password: 'dGVzdC1wYXNzd29yZA==',
    },
};

export const JiraCISecretWithOwnerMock = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: INTEGRATION_SECRET_NAMES.JIRA,
        labels: {
            'app.edp.epam.com/secret-type': 'jira',
            'app.edp.epam.com/integration-secret': 'true',
        },
        ownerReferences: [
            {
                apiVersion: 'apiVersion',
                kind: 'ExternalSecret',
                name: INTEGRATION_SECRET_NAMES.JIRA,
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
    },
};
