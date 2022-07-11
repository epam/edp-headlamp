import { KubeObjectConfig } from '../../types/configs/k8s';

export const EDPCodebaseImageStreamKubeObjectConfig: KubeObjectConfig = {
    name: {
        singularForm: 'codebaseimagestream',
        pluralForm: 'codebaseimagestreams',
    },
    group: 'v2.edp.epam.com',
    version: 'v1',
};
