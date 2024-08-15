import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const TaskKubeObjectConfig: KubeObjectConfig = {
  kind: 'Task',
  name: {
    singularForm: 'task',
    pluralForm: 'tasks',
  },
  group: 'tekton.dev',
  version: 'v1',
};
