const NAMES = {
    NAME: 'name',
    REGISTRY_HOST: 'registryHost',
    REGISTRY_SPACE: 'registrySpace',
    USER: 'user',
    PASSWORD: 'password',
} as const;

export const DOCKERHUB_REGISTRY_SECRET_FORM_NAMES = {
    [NAMES.NAME]: {
        name: NAMES.NAME,
        path: ['metadata', 'name'],
    },
    [NAMES.REGISTRY_HOST]: {
        name: NAMES.REGISTRY_HOST,
    },
    [NAMES.USER]: {
        name: NAMES.USER,
    },
    [NAMES.REGISTRY_SPACE]: {
        name: NAMES.REGISTRY_SPACE,
    },
    [NAMES.PASSWORD]: {
        name: NAMES.PASSWORD,
    },
};
