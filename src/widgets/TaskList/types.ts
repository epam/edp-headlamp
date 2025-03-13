import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TaskKubeObjectInterface } from '../../k8s/groups/Tekton/Task/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from '../TaskActionsMenu/constants';

export interface TaskListProps {
  tasks: TaskKubeObjectInterface[];
  isLoading: boolean;
  error?: ApiError;
  permissions: WidgetPermissions;
}

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;
