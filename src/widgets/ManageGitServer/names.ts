const GIT_SERVER_NAMES = {
  NAME: 'name',
  GIT_HOST: 'gitHost',
  GIT_PROVIDER: 'gitProvider',
  GIT_USER: 'gitUser',
  HTTPS_PORT: 'httpsPort',
  NAME_SSH_KEY_SECRET: 'nameSshKeySecret',
  SSH_PORT: 'sshPort',
  SKIP_WEBHOOK_SSL: 'skipWebhookSSLVerification',
} as const;

export const GIT_SERVER_FORM_NAMES = {
  [GIT_SERVER_NAMES.NAME]: {
    name: GIT_SERVER_NAMES.NAME,
    path: ['metadata', 'name'],
  },
  [GIT_SERVER_NAMES.GIT_HOST]: {
    name: GIT_SERVER_NAMES.GIT_HOST,
    path: ['spec', 'gitHost'],
  },
  [GIT_SERVER_NAMES.GIT_PROVIDER]: {
    name: GIT_SERVER_NAMES.GIT_PROVIDER,
    path: ['spec', 'gitProvider'],
  },
  [GIT_SERVER_NAMES.GIT_USER]: {
    name: GIT_SERVER_NAMES.GIT_USER,
    path: ['spec', 'gitUser'],
  },
  [GIT_SERVER_NAMES.HTTPS_PORT]: {
    name: GIT_SERVER_NAMES.HTTPS_PORT,
    path: ['spec', 'httpsPort'],
  },
  [GIT_SERVER_NAMES.NAME_SSH_KEY_SECRET]: {
    name: GIT_SERVER_NAMES.NAME_SSH_KEY_SECRET,
    path: ['spec', 'nameSshKeySecret'],
    notUsedInFormData: true,
  },
  [GIT_SERVER_NAMES.SSH_PORT]: {
    name: GIT_SERVER_NAMES.SSH_PORT,
    path: ['spec', 'sshPort'],
  },
  [GIT_SERVER_NAMES.SKIP_WEBHOOK_SSL]: {
    name: GIT_SERVER_NAMES.SKIP_WEBHOOK_SSL,
    path: ['spec', 'skipWebhookSSLVerification'],
  },
};

const CREDENTIALS_NAMES = {
  SSH_PRIVATE_KEY: 'sshPrivateKey',
  SSH_PUBLIC_KEY: 'sshPublicKey',
  TOKEN: 'token',
} as const;

export const CREDENTIALS_FORM_NAME = {
  [CREDENTIALS_NAMES.SSH_PRIVATE_KEY]: {
    name: CREDENTIALS_NAMES.SSH_PRIVATE_KEY,
    notUsedInFormData: true,
  },
  [CREDENTIALS_NAMES.SSH_PUBLIC_KEY]: {
    name: CREDENTIALS_NAMES.SSH_PUBLIC_KEY,
    notUsedInFormData: true,
  },
  [CREDENTIALS_NAMES.TOKEN]: {
    name: CREDENTIALS_NAMES.TOKEN,
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
