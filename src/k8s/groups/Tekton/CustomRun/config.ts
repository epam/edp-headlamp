import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CustomRunKubeObjectConfig: KubeObjectConfig = {
  kind: 'CustomRun',
  name: {
    singularForm: 'customrun',
    pluralForm: 'customruns',
  },
  group: 'tekton.dev',
  version: 'v1beta1',
};
