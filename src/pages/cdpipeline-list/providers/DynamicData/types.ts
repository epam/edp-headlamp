import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';

export interface DynamicDataContextProviderValue {
  CDPipelines: {
    data: CDPipelineKubeObjectInterface[] | null;
    errors: ApiError[] | null;
    isLoading: boolean;
  };
}
