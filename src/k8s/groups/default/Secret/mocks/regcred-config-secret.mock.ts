/*
Encoded data

"auths": {
    "registry.test.com": {
        "username": "test-username",
        "password": "test-password",
        "auth": "test-auth"
    }
}

*/

export const regcredSecretMock = {
  metadata: {
    name: 'regcred',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/integration-secret': 'true',
      'app.edp.epam.com/secret-type': 'registry',
    },
    annotations: {
      'app.edp.epam.com/integration-secret-connected': 'true',
    },
  },
  immutable: false,
  data: {
    '.dockerconfigjson':
      'eyJhdXRocyI6eyJyZWdpc3RyeS50ZXN0LmNvbSI6eyJ1c2VybmFtZSI6InRlc3QtdXNlcm5hbWUiLCJwYXNzd29yZCI6InRlc3QtcGFzc3dvcmQiLCJhdXRoIjoidGVzdC1hdXRoIn19fQ==',
  },
  type: 'kubernetes.io/dockerconfigjson',
  kind: 'Secret',
  apiVersion: 'v1',
};

export const regcredSecretWithOwnerMock = {
  metadata: {
    name: 'regcred',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/integration-secret': 'true',
      'app.edp.epam.com/secret-type': 'registry',
    },
    annotations: {
      'app.edp.epam.com/integration-secret-connected': 'true',
    },
    ownerReferences: [
      {
        apiVersion: 'external-secrets.io/v1beta1',
        kind: 'ExternalSecret',
        name: 'regcred',
        controller: true,
        blockOwnerDeletion: true,
      },
    ],
  },
  immutable: false,
  data: {
    '.dockerconfigjson':
      'eyJhdXRocyI6eyJyZWdpc3RyeS50ZXN0LmNvbSI6eyJ1c2VybmFtZSI6InRlc3QtdXNlcm5hbWUiLCJwYXNzd29yZCI6InRlc3QtcGFzc3dvcmQiLCJhdXRoIjoidGVzdC1hdXRoIn19fQ==',
  },
  type: 'kubernetes.io/dockerconfigjson',
  kind: 'Secret',
  apiVersion: 'v1',
};
