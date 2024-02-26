import { KubeObjectConfig } from '../../types/configs/k8s';

export const QuickLinkKubeObjectConfig: KubeObjectConfig = {
  kind: 'QuickLink',
  name: {
    singularForm: 'quicklink',
    pluralForm: 'quicklinks',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
