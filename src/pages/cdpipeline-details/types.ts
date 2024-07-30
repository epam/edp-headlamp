import { ValueOf } from '../../types/global';
import { FILTER_CONTROLS } from './constants';
import { StageWithApplicationsData } from './providers/DynamicData/types';

export interface CDPipelineRouteParams {
  name: string;
  namespace: string;
}

export type PageFilterExtraControls = ValueOf<typeof FILTER_CONTROLS>;

export type MatchFunctions = Record<
  PageFilterExtraControls,
  (item: StageWithApplicationsData, value: string | string[]) => boolean
>;
