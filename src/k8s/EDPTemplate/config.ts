import { KubeObjectConfig } from '../../types/configs/k8s';

export const EDPTemplateKubeObjectConfig: KubeObjectConfig = {
    kind: 'Template',
    name: {
        singularForm: 'template',
        pluralForm: 'templates',
    },
    group: 'v2.edp.epam.com',
    version: 'v1alpha1',
};
