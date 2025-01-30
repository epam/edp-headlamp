import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { SavedTableSettings } from '../../components/Table/components/TableSettings/types';
import { PIPELINE_TYPE } from '../../constants/pipelineTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { ControlName } from '../../providers/Filter/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { ValueOf } from '../../types/global';
import { pipelineRunFilterControlNames, widgetPermissionsToCheck } from './constants';

export type PipelineRunFilterControlNames = ValueOf<typeof pipelineRunFilterControlNames>;

export type PipelineRunFilterAllControlNames = ControlName<PipelineRunFilterControlNames>;

export interface TableColumnBase {
  id: string;
  label: string;
}

export interface PipelineRunListProps {
  tableId: string;
  tableName: string;
  pipelineRuns: PipelineRunKubeObjectInterface[];
  isLoading: boolean;
  permissions: WidgetPermissions;
  tableSettings?: SavedTableSettings;
  blockerError?: ApiError;
  errors?: ApiError[] | null;
  pipelineRunTypes?: PIPELINE_TYPE[];
  filterControls?: PipelineRunFilterControlNames[];
}

export type MatchFunctions = {
  [key in PipelineRunFilterAllControlNames]?: (
    item: PipelineRunKubeObjectInterface,
    value: string | string[]
  ) => boolean;
};

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;
