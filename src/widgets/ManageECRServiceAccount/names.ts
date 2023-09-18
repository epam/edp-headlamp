const NAMES = {
    REGISTRY_URL: 'registryEndpoint',
    IRSA_ROLE_ARN: 'irsaRoleArn',
} as const;

export const ECR_SERVICE_ACCOUNT_FORM_NAMES = {
    [NAMES.REGISTRY_URL]: {
        name: NAMES.REGISTRY_URL,
    },
    [NAMES.IRSA_ROLE_ARN]: {
        name: NAMES.IRSA_ROLE_ARN,
        path: ['metadata', 'annotations', 'eks.amazonaws.com/role-arn'],
    },
};
