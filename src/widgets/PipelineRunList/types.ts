import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { PIPELINE_TYPES } from '../../constants/pipelineTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { ValueOf } from '../../types/global';
import { PermissionSet } from '../../types/permissions';
import { FILTER_CONTROLS } from './constants';

export interface PipelineRunListProps {
  pipelineRuns: PipelineRunKubeObjectInterface[];
  isLoading: boolean;
  permissions: PermissionSet;
  error?: ApiError;
  pipelineRunTypes?: PIPELINE_TYPES[];
  filterControls?: ValueOf<typeof FILTER_CONTROLS>[];
}

export type MatchFunctions<Controls extends string> = Record<
  Controls,
  (item: PipelineRunKubeObjectInterface, value: string | string[]) => boolean
>;
