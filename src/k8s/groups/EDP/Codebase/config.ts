import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodebaseKubeObjectConfig: KubeObjectConfig = {
  kind: 'Codebase',
  name: {
    singularForm: 'codebase',
    pluralForm: 'codebases',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
