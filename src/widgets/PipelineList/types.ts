import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from '../PipelineActionsMenu/constants';

export interface PipelineListProps {
  pipelines: PipelineKubeObjectInterface[];
  isLoading: boolean;
  error?: ApiError;
  permissions: WidgetPermissions;
}

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;
