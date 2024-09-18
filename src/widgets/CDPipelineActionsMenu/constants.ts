import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../k8s/groups/EDP/CDPipeline/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [{ instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig }],
  delete: [{ instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig }],
};
