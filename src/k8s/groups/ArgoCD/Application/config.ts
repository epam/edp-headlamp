import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const ApplicationKubeObjectConfig: KubeObjectConfig = {
  kind: 'Application',
  name: {
    singularForm: 'application',
    pluralForm: 'applications',
  },
  group: 'argoproj.io',
  version: 'v1alpha1',
};
