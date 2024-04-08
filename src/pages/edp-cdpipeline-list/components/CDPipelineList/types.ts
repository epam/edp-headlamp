import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';

export interface CDPipelineListProps {
  CDPipelines: EDPCDPipelineKubeObjectInterface[];
  error: ApiError;
  filterFunction: (item: EDPCDPipelineKubeObjectInterface) => boolean;
  blockerComponent?: React.ReactNode;
}
