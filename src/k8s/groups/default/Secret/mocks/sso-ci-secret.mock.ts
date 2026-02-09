import { INTEGRATION_SECRET_NAMES } from '../constants';

/*
 * Encoded data
 * username: test-username
 * password: test-password
 *
 * */

export const SSOCISecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: INTEGRATION_SECRET_NAMES.SSO,
    labels: { 'app.edp.epam.com/secret-type': 'keycloak' },
  },
  type: 'Opaque',
  data: {
    username: 'dGVzdC11c2VybmFtZQ==',
    password: 'dGVzdC1wYXNzd29yZA==',
  },
};

export const SSOCISecretWithOwnerMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: INTEGRATION_SECRET_NAMES.SSO,
    labels: { 'app.edp.epam.com/secret-type': 'keycloak' },
    ownerReferences: [
      {
        apiVersion: 'apiVersion',
        kind: 'ExternalSecret',
        name: INTEGRATION_SECRET_NAMES.SSO,
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
