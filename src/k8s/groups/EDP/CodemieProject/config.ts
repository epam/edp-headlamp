import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodemieProjectKubeObjectConfig: KubeObjectConfig = {
  kind: 'CodemieProject',
  name: {
    singularForm: 'codemieproject',
    pluralForm: 'codemieprojects',
  },
  group: 'edp.epam.com',
  version: 'v1alpha1',
};
