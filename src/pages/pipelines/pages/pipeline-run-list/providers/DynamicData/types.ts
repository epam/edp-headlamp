import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/PipelineRun/types';

export interface DynamicDataContextProviderValue {
  pipelineRuns: {
    data: PipelineRunKubeObjectInterface[] | null;
    errors: ApiError[] | null;
    isLoading: boolean;
  };
}
