import { KubeObjectConfig } from '../../types/configs/k8s';

export const EDPCDPipelineKubeObjectConfig: KubeObjectConfig = {
    name: {
        singularForm: 'cdpipeline',
        pluralForm: 'cdpipelines',
    },
    group: 'v2.edp.epam.com',
    version: 'v1',
};
