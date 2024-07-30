import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CodebaseBranchKubeObjectConfig: KubeObjectConfig = {
  kind: 'CodebaseBranch',
  name: {
    singularForm: 'codebasebranch',
    pluralForm: 'codebasebranches',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
