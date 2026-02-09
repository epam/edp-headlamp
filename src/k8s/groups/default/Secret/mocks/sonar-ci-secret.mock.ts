import { INTEGRATION_SECRET_NAMES } from '../constants';

/*
 * Encoded data
 * token: test-token
 * url: https://test-url.com
 *
 * */

export const SonarCISecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: INTEGRATION_SECRET_NAMES.SONAR,
    labels: {
      'app.edp.epam.com/secret-type': 'sonar',
      'app.edp.epam.com/integration-secret': 'true',
    },
  },
  data: {
    token: 'dGVzdC10b2tlbg==',
    url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
  },
  type: 'Opaque',
};

export const SonarCISecretWithOwnerMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: INTEGRATION_SECRET_NAMES.SONAR,
    labels: {
      'app.edp.epam.com/secret-type': 'sonar',
    },
    ownerReferences: [
      {
        apiVersion: 'apiVersion',
        kind: 'ExternalSecret',
        name: INTEGRATION_SECRET_NAMES.SONAR,
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
