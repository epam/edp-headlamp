import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { PIPELINE_TYPES } from '../../constants/pipelineTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import {
  PipelineRunFilterAllControlNames,
  PipelineRunFilterControlNames,
  widgetPermissionsToCheck,
} from './constants';

export interface PipelineRunListProps {
  pipelineRuns: PipelineRunKubeObjectInterface[];
  isLoading: boolean;
  permissions: WidgetPermissions;
  blockerError?: ApiError;
  errors?: ApiError[] | null;
  pipelineRunTypes?: PIPELINE_TYPES[];
  filterControls?: PipelineRunFilterControlNames[];
}

export type MatchFunctions = {
  [key in PipelineRunFilterAllControlNames]?: (
    item: PipelineRunKubeObjectInterface,
    value: string | string[]
  ) => boolean;
};

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;
