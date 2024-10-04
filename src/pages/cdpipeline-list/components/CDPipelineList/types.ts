import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';

export interface CDPipelineListProps {
  filterFunction: (item: CDPipelineKubeObjectInterface) => boolean;
  blockerComponent?: React.ReactNode;
}
