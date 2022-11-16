import { KubeObjectConfig } from '../../types/configs/k8s';

export const JenkinsKubeObjectConfig: KubeObjectConfig = {
    kind: 'Jenkins',
    name: {
        singularForm: 'jenkins',
        pluralForm: 'jenkins',
    },
    group: 'v2.edp.epam.com',
    version: 'v1',
};
