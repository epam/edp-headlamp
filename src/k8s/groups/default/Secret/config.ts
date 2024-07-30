import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const SecretKubeObjectConfig: KubeObjectConfig = {
  kind: 'Secret',
  name: {
    singularForm: 'secret',
    pluralForm: 'secrets',
  },
  version: 'v1',
};
