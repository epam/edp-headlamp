import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../k8s/groups/EDP/CDPipeline/config';
import { CDPipelineKubeObjectInterface } from '../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { MatchFunctions } from './types';

export const permissionsToCheckConfig = {
  create: [
    { instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig },
    { instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig },
  ],
  update: [{ instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig }],
  delete: [{ instance: CDPipelineKubeObject, config: CDPipelineKubeObjectConfig }],
};

export const cdPipelineFilterControlNames = {
  CODEBASES: 'codebases',
} as const;

export const matchFunctions: MatchFunctions = {
  [cdPipelineFilterControlNames.CODEBASES]: (
    item: CDPipelineKubeObjectInterface,
    value: string[]
  ) => {
    if (!value || value.length === 0) return true;

    return item.spec.applications.some((app) => value.includes(app));
  },
};
