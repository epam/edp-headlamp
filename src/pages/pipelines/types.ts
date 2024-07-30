import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { ValueOf } from '../../types/global';
import { FILTER_CONTROLS } from './constants';

export type PageFilterExtraControls = ValueOf<typeof FILTER_CONTROLS>;

export type MatchFunctions = Record<
  PageFilterExtraControls,
  (item: PipelineRunKubeObjectInterface, value: string | string[]) => boolean
>;
