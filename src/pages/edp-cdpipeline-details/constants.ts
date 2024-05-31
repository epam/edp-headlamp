import { ApplicationKubeObject } from '../../k8s/Application';
import { APPLICATION_HEALTH_STATUS } from '../../k8s/Application/constants';
import { ValueOf } from '../../types/global';
import { StageWithApplicationsData } from './providers/DynamicData/types';
import { MatchFunctions } from './types';

export const FILTER_CONTROLS = {
  APPLICATION: 'application',
  STAGES: 'stages',
  HEALTH: 'health',
};

export const matchFunctions: MatchFunctions = {
  [FILTER_CONTROLS.STAGES]: (item: StageWithApplicationsData, value: string[]) => {
    if (!value.length) {
      return true;
    }

    return value.includes(item.stage.spec.name);
  },
  [FILTER_CONTROLS.APPLICATION]: () => true, // same applications exist in each stage

  [FILTER_CONTROLS.HEALTH]: (
    item: StageWithApplicationsData,
    value: 'All' | ValueOf<typeof APPLICATION_HEALTH_STATUS>
  ) => {
    return item.applications.some((app) =>
      value === 'All' ? true : ApplicationKubeObject.parseStatus(app.argoApplication) === value
    );
  },
};

export const permissionChecks = {
  CD_PIPELINE: 'cdPipeline',
  STAGE: 'stage',
} as const;
