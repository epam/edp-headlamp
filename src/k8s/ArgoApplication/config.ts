import { KubeObjectConfig } from '../../types/configs/k8s';

export const ArgoApplicationKubeObjectConfig: KubeObjectConfig = {
    kind: 'ArgoApplication',
    name: {
        singularForm: 'argoapplication',
        pluralForm: 'argoapplications',
    },
    group: 'v1.edp.epam.com',
    version: 'v1alpha1',
};
