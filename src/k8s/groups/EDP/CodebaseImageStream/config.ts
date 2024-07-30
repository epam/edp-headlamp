import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodebaseImageStreamKubeObjectConfig: KubeObjectConfig = {
  kind: 'CodebaseImageStream',
  name: {
    singularForm: 'codebaseimagestream',
    pluralForm: 'codebaseimagestreams',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
