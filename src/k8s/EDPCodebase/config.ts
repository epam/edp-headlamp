import { KubeObjectConfig } from '../../types/configs/k8s';

export const EDPCodebaseKubeObjectConfig: KubeObjectConfig = {
    name: {
        singularForm: 'codebase',
        pluralForm: 'codebases',
    },
    group: 'v2.edp.epam.com',
    version: 'v1',
};
