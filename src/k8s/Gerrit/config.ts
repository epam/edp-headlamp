import { KubeObjectConfig } from '../../types/configs/k8s';

export const GerritKubeObjectConfig: KubeObjectConfig = {
  kind: 'Gerrit',
  name: {
    singularForm: 'gerrit',
    pluralForm: 'gerrits',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
