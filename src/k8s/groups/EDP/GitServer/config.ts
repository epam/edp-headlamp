import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const GitServerKubeObjectConfig: KubeObjectConfig = {
  kind: 'GitServer',
  name: {
    singularForm: 'gitserver',
    pluralForm: 'gitservers',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
