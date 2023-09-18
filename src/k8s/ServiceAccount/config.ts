import { KubeObjectConfig } from '../../types/configs/k8s';

export const ServiceAccountKubeObjectConfig: KubeObjectConfig = {
    kind: 'ServiceAccount',
    name: {
        singularForm: 'serviceaccount',
        pluralForm: 'serviceaccounts',
    },
    version: 'v1',
};
