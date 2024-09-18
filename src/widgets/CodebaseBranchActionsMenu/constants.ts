import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { CodebaseBranchKubeObjectConfig } from '../../k8s/groups/EDP/CodebaseBranch/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [{ instance: CodebaseBranchKubeObject, config: CodebaseBranchKubeObjectConfig }],
  delete: [{ instance: CodebaseBranchKubeObject, config: CodebaseBranchKubeObjectConfig }],
};
