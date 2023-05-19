import { KubeObjectConfig } from '../../types/configs/k8s';

export const TaskRunKubeObjectConfig: KubeObjectConfig = {
    kind: 'TaskRun',
    name: {
        singularForm: 'taskrun',
        pluralForm: 'taskruns',
    },
    group: 'tekton.dev',
    version: 'v1beta1',
};
