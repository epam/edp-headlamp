const NAMES = {
    NAME: 'name',
    GIT_HOST: 'gitHost',
    GIT_PROVIDER: 'gitProvider',
    GIT_USER: 'gitUser',
    HTTPS_PORT: 'httpsPort',
    NAME_SSH_KEY_SECRET: 'nameSshKeySecret',
    SSH_PORT: 'sshPort',

    // NOT USED IN RESOURCE DATA
    SSH_PRIVATE_KEY: 'sshPrivateKey',
    SSH_PUBLIC_KEY: 'sshPublicKey',
    TOKEN: 'token',
    SECRET_STRING: 'secretString',
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

    // NOT USED IN RESOURCE DATA
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
    [NAMES.SECRET_STRING]: {
        name: NAMES.SECRET_STRING,
        notUsedInFormData: true,
    },
};
