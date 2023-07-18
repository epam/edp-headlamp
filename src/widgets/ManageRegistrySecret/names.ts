const NAME_NAME = 'name' as const;
const NAME_REGISTRY_ENDPOINT = 'registryEndpoint' as const;
const NAME_USER = 'user' as const;
const NAME_PASSWORD = 'password' as const;

export const REGISTRY_SECRET_CREATION_FORM_NAMES = {
    [NAME_NAME]: {
        name: NAME_NAME,
        path: ['metadata', 'name'],
    },
    [NAME_REGISTRY_ENDPOINT]: {
        name: NAME_REGISTRY_ENDPOINT,
    },
    [NAME_USER]: {
        name: NAME_USER,
    },
    [NAME_PASSWORD]: {
        name: NAME_PASSWORD,
    },
};
