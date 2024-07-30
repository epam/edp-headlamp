import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { PermissionSet } from '../../types/permissions';

export interface PipelineRunListProps {
  pipelineRuns: PipelineRunKubeObjectInterface[];
  isLoading: boolean;
  filterFunction: (item: PipelineRunKubeObjectInterface) => boolean;
  permissions: PermissionSet;
  error?: ApiError;
}
