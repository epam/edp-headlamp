import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const ApprovalTaskKubeObjectConfig: KubeObjectConfig = {
  kind: 'ApprovalTask',
  name: {
    singularForm: 'approvaltask',
    pluralForm: 'approvaltasks',
  },
  group: 'edp.epam.com',
  version: 'v1alpha1',
};
