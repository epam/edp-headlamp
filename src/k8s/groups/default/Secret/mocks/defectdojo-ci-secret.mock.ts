import { INTEGRATION_SECRET_NAMES } from '../constants';

/*
 * Encoded data
 * token: test-token
 * url: https://test-url.com
 *
 * */

export const DefectDojoCISecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: INTEGRATION_SECRET_NAMES.DEFECT_DOJO,
    labels: {
      'app.edp.epam.com/secret-type': 'defectdojo',
      'app.edp.epam.com/integration-secret': 'true',
    },
  },
  type: 'Opaque',
  data: {
    token: 'dGVzdC10b2tlbg==',
    url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
  },
};
export const DefectDojoCISecretWithOwnerMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: INTEGRATION_SECRET_NAMES.DEFECT_DOJO,
    labels: {
      'app.edp.epam.com/secret-type': 'defectdojo',
      'app.edp.epam.com/integration-secret': 'true',
    },
    ownerReferences: [
      {
        apiVersion: 'apiVersion',
        kind: 'ExternalSecret',
        name: INTEGRATION_SECRET_NAMES.DEFECT_DOJO,
        uid: 'test-uid',
        controller: true,
        blockOwnerDeletion: true,
      },
    ],
  },
  type: 'Opaque',
  data: {
    token: 'dGVzdC10b2tlbg==',
    url: 'aHR0cHM6Ly90ZXN0LXVybC5jb20=',
  },
};
