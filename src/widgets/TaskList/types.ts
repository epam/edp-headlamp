import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TaskKubeObjectInterface } from '../../k8s/groups/Tekton/Task/types';

export interface TaskListProps {
  tasks: TaskKubeObjectInterface[];
  isLoading: boolean;
  error?: ApiError;
}
