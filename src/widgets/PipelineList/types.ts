import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';

export interface PipelineListProps {
  pipelines: PipelineKubeObjectInterface[];
  isLoading: boolean;
  error?: ApiError;
}
