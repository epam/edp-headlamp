import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const StageKubeObjectConfig: KubeObjectConfig = {
  kind: 'Stage',
  name: {
    singularForm: 'stage',
    pluralForm: 'stages',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
