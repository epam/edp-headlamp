import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodemieProjectSettingsKubeObjectConfig: KubeObjectConfig = {
  kind: 'CodemieProjectSettings',
  name: {
    singularForm: 'codemieprojectsettings',
    pluralForm: 'codemieprojectsettings',
  },
  group: 'edp.epam.com',
  version: 'v1alpha1',
};
