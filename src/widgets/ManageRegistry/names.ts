import { IRSA_ROLE_ARN_ANNOTATION } from '../../k8s/ServiceAccount/constants';

const SHARED_NAMES = {
  REGISTRY_TYPE: 'registryType',
  REGISTRY_ENDPOINT: 'registryEndpoint',
  USE_SAME_ACCOUNT: 'useSameAccount',
} as const;

export const SHARED_FORM_NAMES = {
  [SHARED_NAMES.REGISTRY_TYPE]: {
    name: SHARED_NAMES.REGISTRY_TYPE,
  },
  [SHARED_NAMES.REGISTRY_ENDPOINT]: {
    name: SHARED_NAMES.REGISTRY_ENDPOINT,
  },
  [SHARED_NAMES.USE_SAME_ACCOUNT]: {
    name: SHARED_NAMES.USE_SAME_ACCOUNT,
  },
};

const CONFIG_MAP_NAMES = {
  REGISTRY_TYPE: 'registryType',
  REGISTRY_ENDPOINT: 'registryEndpoint',
  REGISTRY_SPACE: 'registrySpace',
  AWS_REGION: 'awsRegion',
} as const;

export const CONFIG_MAP_FORM_NAMES = {
  [CONFIG_MAP_NAMES.REGISTRY_TYPE]: {
    name: CONFIG_MAP_NAMES.REGISTRY_TYPE,
    path: ['data', 'container_registry_type'],
  },
  [CONFIG_MAP_NAMES.REGISTRY_ENDPOINT]: {
    name: CONFIG_MAP_NAMES.REGISTRY_ENDPOINT,
    path: ['data', 'container_registry_host'],
  },
  [CONFIG_MAP_NAMES.REGISTRY_SPACE]: {
    name: CONFIG_MAP_NAMES.REGISTRY_SPACE,
    path: ['data', 'container_registry_space'],
  },
  [CONFIG_MAP_NAMES.AWS_REGION]: {
    name: CONFIG_MAP_NAMES.AWS_REGION,
    path: ['data', 'aws_region'],
  },
};

const SERVICE_ACCOUNT_NAMES = {
  IRSA_ROLE_ARN: 'irsaRoleArn',
} as const;

export const SERVICE_ACCOUNT_FORM_NAMES = {
  [SERVICE_ACCOUNT_NAMES.IRSA_ROLE_ARN]: {
    name: SERVICE_ACCOUNT_NAMES.IRSA_ROLE_ARN,
    path: ['metadata', 'annotations', IRSA_ROLE_ARN_ANNOTATION],
  },
};

const PUSH_ACCOUNT_NAMES = {
  PUSH_ACCOUNT_USER: 'pushAccountUser',
  PUSH_ACCOUNT_PASSWORD: 'pushAccountPassword',
} as const;

export const PUSH_ACCOUNT_FORM_NAMES = {
  [PUSH_ACCOUNT_NAMES.PUSH_ACCOUNT_USER]: {
    name: PUSH_ACCOUNT_NAMES.PUSH_ACCOUNT_USER,
  },
  [PUSH_ACCOUNT_NAMES.PUSH_ACCOUNT_PASSWORD]: {
    name: PUSH_ACCOUNT_NAMES.PUSH_ACCOUNT_PASSWORD,
  },
};

const PULL_ACCOUNT_NAMES = {
  PULL_ACCOUNT_USER: 'pullAccountUser',
  PULL_ACCOUNT_PASSWORD: 'pullAccountPassword',
} as const;

export const PULL_ACCOUNT_FORM_NAMES = {
  [PULL_ACCOUNT_NAMES.PULL_ACCOUNT_USER]: {
    name: PULL_ACCOUNT_NAMES.PULL_ACCOUNT_USER,
  },
  [PULL_ACCOUNT_NAMES.PULL_ACCOUNT_PASSWORD]: {
    name: PULL_ACCOUNT_NAMES.PULL_ACCOUNT_PASSWORD,
  },
};
