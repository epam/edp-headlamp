import { KubeObjectConfig } from '../../types/configs/k8s';

export const EDPComponentKubeObjectConfig: KubeObjectConfig = {
    kind: 'EDPComponent',
    name: {
        singularForm: 'edpcomponent',
        pluralForm: 'edpcomponents',
    },
    group: 'v1.edp.epam.com',
    version: 'v1',
};
