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

export const kanikoDockerSecretMock = {
  metadata: {
    name: 'kaniko-docker-config',
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

export const kanikoDockerSecretWithOwnerMock = {
  metadata: {
    name: 'kaniko-docker-config',
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
        name: 'kaniko-docker-config',
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

export const ECRPushSecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'kaniko-docker-config',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'registry',
    },
  },
  type: 'kubernetes.io/dockerconfigjson',
  data: {
    '.dockerconfigjson': 'eyJjcmVkc1N0b3JlIjoiZWNyLWxvZ2luIn0=',
  },
};

export const openshiftPushSecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'kaniko-docker-config',
    labels: {
      'app.edp.epam.com/secret-type': 'registry',
    },
  },
  type: 'kubernetes.io/dockerconfigjson',
  data: {
    '.dockerconfigjson':
      'eyJhdXRocyI6eyJ0ZXN0LWVuZHBvaW50Ijp7ImF1dGgiOiJkR1Z6ZEMxMGIydGxiZz09In19fQ==',
  },
};
