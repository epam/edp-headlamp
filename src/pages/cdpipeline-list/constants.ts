import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../k8s/groups/EDP/CDPipeline/config';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';

export const permissionsToCheckConfig = {
  create: [
    { instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig },
    { instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig },
  ],
  update: [{ instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig }],
  delete: [{ instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig }],
};
