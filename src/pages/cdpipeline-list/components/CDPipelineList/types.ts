import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';

export interface CDPipelineListProps {
  CDPipelines: CDPipelineKubeObjectInterface[];
  error: ApiError;
  filterFunction: (item: CDPipelineKubeObjectInterface) => boolean;
  blockerComponent?: React.ReactNode;
}
