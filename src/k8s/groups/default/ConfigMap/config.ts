import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const ConfigMapKubeObjectConfig: KubeObjectConfig = {
  kind: 'ConfigMap',
  name: {
    singularForm: 'configmap',
    pluralForm: 'configmaps',
  },
  version: 'v1',
};
