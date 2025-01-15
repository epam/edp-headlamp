import { ControlName } from '../../providers/Filter/types';
import { ValueOf } from '../../types/global';
import { stagesFilterControlNames } from './constants';
import { StageWithApplicationsData } from './providers/DynamicData/types';

export interface CDPipelineRouteParams {
  name: string;
  namespace: string;
}

export type StagesFilterControlNames = ValueOf<typeof stagesFilterControlNames>;

export type StagesFilterAllControlNames = ControlName<StagesFilterControlNames>;

export type MatchFunctions = {
  [key in StagesFilterAllControlNames]?: (
    item: StageWithApplicationsData,
    value: string | string[]
  ) => boolean;
};
