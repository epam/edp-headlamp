import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../k8s/groups/EDP/CDPipeline/config';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { MatchFunctions } from './types';

export const cdPipelineFilterControlNames = {
  CODEBASES: 'codebases',
} as const;

export const matchFunctions: MatchFunctions = {
  [cdPipelineFilterControlNames.CODEBASES]: (item, value) => {
    if (!value || value.length === 0) return true;

    return item.spec.applications.some((app) => value.includes(app));
  },
};

export const permissionsToCheckConfig = {
  create: [
    {
      instance: CDPipelineKubeObject as unknown as KubeObjectClass,
      config: CDPipelineKubeObjectConfig,
    },
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: CDPipelineKubeObject as unknown as KubeObjectClass,
      config: CDPipelineKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: CDPipelineKubeObject as unknown as KubeObjectClass,
      config: CDPipelineKubeObjectConfig,
    },
  ],
};
