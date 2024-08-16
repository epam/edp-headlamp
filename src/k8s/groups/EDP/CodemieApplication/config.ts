import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodemieApplicationKubeObjectConfig: KubeObjectConfig = {
  kind: 'CodemieApplication',
  name: {
    singularForm: 'codemieapplication',
    pluralForm: 'codemieapplications',
  },
  group: 'edp.epam.com',
  version: 'v1alpha1',
};
