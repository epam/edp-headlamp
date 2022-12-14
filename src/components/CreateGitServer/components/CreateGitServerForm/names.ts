import { FormNameObject } from '../../../../types/forms';

export const GIT_SERVER_CREATION_NAME_NAME: FormNameObject = {
    name: 'name',
    path: ['metadata', 'name'],
};

export const GIT_SERVER_CREATION_NAME_GIT_HOST: FormNameObject = {
    name: 'gitHost',
    path: ['spec', 'gitHost'],
};

export const GIT_SERVER_CREATION_NAME_GIT_PROVIDER: FormNameObject = {
    name: 'gitProvider',
    path: ['spec', 'gitProvider'],
};

export const GIT_SERVER_CREATION_NAME_GIT_USER: FormNameObject = {
    name: 'gitUser',
    path: ['spec', 'gitUser'],
};

export const GIT_SERVER_CREATION_NAME_SSH_PRIVATE_KEY: FormNameObject = {
    name: 'sshPrivateKey',
    notUsedInFormData: true,
};

export const GIT_SERVER_CREATION_NAME_TOKEN: FormNameObject = {
    name: 'token',
    notUsedInFormData: true,
};

export const GIT_SERVER_CREATION_NAME_HTTPS_PORT: FormNameObject = {
    name: 'httpsPort',
    path: ['spec', 'httpsPort'],
};

export const GIT_SERVER_CREATION_NAME_SSH_KEY_SECRET_NAME: FormNameObject = {
    name: 'nameSshKeySecret',
    path: ['spec', 'nameSshKeySecret'],
};

export const GIT_SERVER_CREATION_NAME_SSH_PORT: FormNameObject = {
    name: 'sshPort',
    path: ['spec', 'sshPort'],
};

export const GIT_SERVER_NAMES: { [key: string]: FormNameObject } = {
    name: GIT_SERVER_CREATION_NAME_NAME,
    gitHost: GIT_SERVER_CREATION_NAME_GIT_HOST,
    gitProvider: GIT_SERVER_CREATION_NAME_GIT_PROVIDER,
    gitUser: GIT_SERVER_CREATION_NAME_GIT_USER,
    sshPrivateKey: GIT_SERVER_CREATION_NAME_SSH_PRIVATE_KEY,
    token: GIT_SERVER_CREATION_NAME_TOKEN,
    httpsPort: GIT_SERVER_CREATION_NAME_HTTPS_PORT,
    nameSshKeySecret: GIT_SERVER_CREATION_NAME_SSH_KEY_SECRET_NAME,
    sshPort: GIT_SERVER_CREATION_NAME_SSH_PORT,
};

export const GIT_SERVER_SECRET_CREATION_NAME_GIT_HOST: FormNameObject = {
    name: 'gitHost',
    path: ['metadata', 'name'],
};

export const GIT_SERVER_SECRET_CREATION_NAME_NAMESPACE: FormNameObject = {
    name: 'gitHost',
    path: ['metadata', 'namespace'],
};

export const GIT_SERVER_SECRET_CREATION_NAME_USER: FormNameObject = {
    name: 'gitUser',
    path: ['data', 'username'],
};

export const GIT_SERVER_SECRET_CREATION_NAME_SSH_PRIVATE_KEY: FormNameObject = {
    name: 'sshPrivateKey',
    path: ['data', 'id_rsa'],
};

export const GIT_SERVER_SECRET_CREATION_NAME_TOKEN: FormNameObject = {
    name: 'token',
    path: ['data', 'token'],
};

export const GIT_SERVER_SECRET_NAMES: { [key: string]: FormNameObject } = {
    gitHost: GIT_SERVER_SECRET_CREATION_NAME_GIT_HOST,
    namespace: GIT_SERVER_SECRET_CREATION_NAME_NAMESPACE,
    gitUser: GIT_SERVER_SECRET_CREATION_NAME_USER,
    sshPrivateKey: GIT_SERVER_SECRET_CREATION_NAME_SSH_PRIVATE_KEY,
    token: GIT_SERVER_SECRET_CREATION_NAME_TOKEN,
};
