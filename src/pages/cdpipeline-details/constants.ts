import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ApplicationKubeObject } from '../../k8s/groups/ArgoCD/Application';
import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../k8s/groups/EDP/CDPipeline/config';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { StageKubeObjectConfig } from '../../k8s/groups/EDP/Stage/config';
import { MatchFunctions } from './types';

export const stagesFilterControlNames = {
  APPLICATION: 'application',
  STAGES: 'stages',
  HEALTH: 'health',
} as const;

export const matchFunctions: MatchFunctions = {
  [stagesFilterControlNames.STAGES]: (item, value) => {
    if (!value.length) {
      return true;
    }

    return value.includes(item.stage.spec.name);
  },
  [stagesFilterControlNames.APPLICATION]: () => true, // same applications exist in each stage

  [stagesFilterControlNames.HEALTH]: (item, value) => {
    return item.applications.some((app) =>
      value === 'All' ? true : ApplicationKubeObject.parseStatus(app.argoApplication) === value
    );
  },
};

export const permissionsToCheckConfig = {
  create: [
    { instance: StageKubeObject as unknown as KubeObjectClass, config: StageKubeObjectConfig },
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
