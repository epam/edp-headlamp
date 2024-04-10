/*
 * Encoded data
 * id_rsa: test-id_rsa
 * secretString: test-secretString
 * token: test-token
 *
 * */

export const GithubCISecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'ci-github',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'repository',
    },
  },
  immutable: false,
  data: {
    id_rsa: 'dGVzdC1pZF9yc2E=',
    secretString: 'dGVzdC1zZWNyZXRTdHJpbmc=',
    token: 'dGVzdC10b2tlbg==',
  },
  type: 'Opaque',
};

export const GithubCISecretWithOwnerMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'ci-github',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'repository',
    },
    ownerReferences: [
      {
        apiVersion: 'external-secrets.io/v1beta1',
        kind: 'ExternalSecret',
        name: 'ci-github',
      },
    ],
  },
  immutable: false,
  data: {
    id_rsa: 'dGVzdC1pZF9yc2E=',
    secretString: 'dGVzdC1zZWNyZXRTdHJpbmc=',
    token: 'dGVzdC10b2tlbg==',
  },
  type: 'Opaque',
};

/*
 * Encoded data
 * id_rsa: test-id_rsa
 * secretString: test-secretString
 * token: test-token
 *
 * */

export const GitlabCISecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'ci-gitlab',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'repository',
    },
  },
  immutable: false,
  data: {
    id_rsa: 'dGVzdC1pZF9yc2E=',
    secretString: 'dGVzdC1zZWNyZXRTdHJpbmc=',
    token: 'dGVzdC10b2tlbg==',
  },
  type: 'Opaque',
};

export const GitlabCISecretWithOwnerMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'ci-gitlab',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'repository',
    },
    ownerReferences: [
      {
        apiVersion: 'external-secrets.io/v1beta1',
        kind: 'ExternalSecret',
        name: 'ci-gitlab',
      },
    ],
  },
  immutable: false,
  data: {
    id_rsa: 'dGVzdC1pZF9yc2E=',
    secretString: 'dGVzdC1zZWNyZXRTdHJpbmc=',
    token: 'dGVzdC10b2tlbg==',
  },
  type: 'Opaque',
};

/*
 * Encoded data
 * id_rsa: test-id_rsa
 * id_rsa.pub: test-id_rsa.pub
 * username: test-username
 *
 * */

export const GerritCISecretMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'gerrit-ciuser-sshkey',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'repository',
    },
  },
  immutable: false,
  data: {
    id_rsa: 'dGVzdC1pZF9yc2E=',
    id_rsa_pub: 'dGVzdC1pZF9yc2EucHVi',
    username: 'dGVzdCnVzZXJuYW1l',
  },
  type: 'Opaque',
};

export const GerritCISecretWithOwnerMock = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'gerrit-ciuser-sshkey',
    namespace: 'test-namespace',
    labels: {
      'app.edp.epam.com/secret-type': 'repository',
    },
    ownerReferences: [
      {
        apiVersion: 'external-secrets.io/v1beta1',
        kind: 'Gerrit',
        name: 'gerrit',
      },
    ],
  },
  immutable: false,
  data: {
    id_rsa: 'dGVzdC1pZF9yc2E=',
    id_rsa_pub: 'dGVzdC1pZF9yc2EucHVi',
    username: 'dGVzdCnVzZXJuYW1l',
  },
  type: 'Opaque',
};
