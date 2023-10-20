const NAMES = {
    NAME: 'name',
    REGISTRY_HOST: 'registryHost',
    REGISTRY_SPACE: 'registrySpace',
    IRSA_ROLE_ARN: 'irsaRoleArn',
} as const;

export const ECR_REGISTRY_FORM_NAMES = {
    [NAMES.NAME]: {
        name: NAMES.NAME,
    },
    [NAMES.REGISTRY_HOST]: {
        name: NAMES.REGISTRY_HOST,
    },
    [NAMES.IRSA_ROLE_ARN]: {
        name: NAMES.IRSA_ROLE_ARN,
        path: ['metadata', 'annotations', 'eks.amazonaws.com/role-arn'],
    },
    [NAMES.REGISTRY_SPACE]: {
        name: NAMES.REGISTRY_SPACE,
    },
};
