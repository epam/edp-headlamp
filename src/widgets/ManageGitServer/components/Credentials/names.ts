const NAMES = {
  SSH_PRIVATE_KEY: 'sshPrivateKey',
  SSH_PUBLIC_KEY: 'sshPublicKey',
  TOKEN: 'token',
} as const;

export const CREDENTIALS_FORM_NAME = {
  [NAMES.SSH_PRIVATE_KEY]: {
    name: NAMES.SSH_PRIVATE_KEY,
    notUsedInFormData: true,
  },
  [NAMES.SSH_PUBLIC_KEY]: {
    name: NAMES.SSH_PUBLIC_KEY,
    notUsedInFormData: true,
  },
  [NAMES.TOKEN]: {
    name: NAMES.TOKEN,
    notUsedInFormData: true,
  },
};

export const GIT_SERVER_GERRIT_SECRET_FORM_NAMES = {
  sshPrivateKey: {
    name: 'sshPrivateKey',
    path: ['data', 'id_rsa'],
  },
  sshPublicKey: {
    name: 'sshPublicKey',
    path: ['data', 'id_rsa.pub'],
  },
  gitUser: {
    name: 'gitUser',
    path: ['data', 'username'],
  },
};

export const GIT_SERVER_GITHUB_SECRET_FORM_NAMES = {
  sshPrivateKey: {
    name: 'sshPrivateKey',
    path: ['data', 'id_rsa'],
  },
  token: {
    name: 'token',
    path: ['data', 'token'],
  },
  gitUser: {
    name: 'gitUser',
    path: ['data', 'username'],
  },
};

export const GIT_SERVER_GITLAB_SECRET_FORM_NAMES = {
  sshPrivateKey: {
    name: 'sshPrivateKey',
    path: ['data', 'id_rsa'],
  },
  token: {
    name: 'token',
    path: ['data', 'token'],
  },
};
