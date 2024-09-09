import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { CodebaseBranchKubeObjectConfig } from '../../k8s/groups/EDP/CodebaseBranch/config';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';

export const permissionsToCheckConfig = {
  create: [
    { instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig },
    { instance: CodebaseBranchKubeObject, config: CodebaseBranchKubeObjectConfig },
  ],
  update: [
    { instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig },
    { instance: CodebaseBranchKubeObject, config: CodebaseBranchKubeObjectConfig },
    { instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig },
  ],
  delete: [
    { instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig },
    { instance: CodebaseBranchKubeObject, config: CodebaseBranchKubeObjectConfig },
    { instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig },
  ],
};
