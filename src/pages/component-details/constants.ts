import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { CodebaseBranchKubeObjectConfig } from '../../k8s/groups/EDP/CodebaseBranch/config';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';

export const permissionsToCheckConfig = {
  create: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
    {
      instance: CodebaseBranchKubeObject as unknown as KubeObjectClass,
      config: CodebaseBranchKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
    {
      instance: CodebaseBranchKubeObject as unknown as KubeObjectClass,
      config: CodebaseBranchKubeObjectConfig,
    },
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
    {
      instance: CodebaseBranchKubeObject as unknown as KubeObjectClass,
      config: CodebaseBranchKubeObjectConfig,
    },
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
};
