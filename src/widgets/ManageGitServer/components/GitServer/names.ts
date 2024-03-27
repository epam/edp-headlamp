const NAMES = {
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
  [NAMES.NAME]: {
    name: NAMES.NAME,
    path: ['metadata', 'name'],
  },
  [NAMES.GIT_HOST]: {
    name: NAMES.GIT_HOST,
    path: ['spec', 'gitHost'],
  },
  [NAMES.GIT_PROVIDER]: {
    name: NAMES.GIT_PROVIDER,
    path: ['spec', 'gitProvider'],
  },
  [NAMES.GIT_USER]: {
    name: NAMES.GIT_USER,
    path: ['spec', 'gitUser'],
  },
  [NAMES.HTTPS_PORT]: {
    name: NAMES.HTTPS_PORT,
    path: ['spec', 'httpsPort'],
  },
  [NAMES.NAME_SSH_KEY_SECRET]: {
    name: NAMES.NAME_SSH_KEY_SECRET,
    path: ['spec', 'nameSshKeySecret'],
    notUsedInFormData: true,
  },
  [NAMES.SSH_PORT]: {
    name: NAMES.SSH_PORT,
    path: ['spec', 'sshPort'],
  },
  [NAMES.SKIP_WEBHOOK_SSL]: {
    name: NAMES.SKIP_WEBHOOK_SSL,
    path: ['spec', 'skipWebhookSSLVerification'],
  },
};
