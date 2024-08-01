import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodemieKubeObjectConfig: KubeObjectConfig = {
  kind: 'Codemie',
  name: {
    singularForm: 'codemie',
    pluralForm: 'codemies',
  },
  group: 'edp.epam.com',
  version: 'v1alpha1',
};
