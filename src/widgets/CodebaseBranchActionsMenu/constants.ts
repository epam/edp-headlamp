import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { CodebaseBranchKubeObjectConfig } from '../../k8s/groups/EDP/CodebaseBranch/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [
    {
      instance: CodebaseBranchKubeObject as unknown as KubeObjectClass,
      config: CodebaseBranchKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: CodebaseBranchKubeObject as unknown as KubeObjectClass,
      config: CodebaseBranchKubeObjectConfig,
    },
  ],
};
