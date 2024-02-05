import { PipelineRunKubeObjectInterface } from '../../k8s/PipelineRun/types';

export interface PipelineRunListProps {
  pipelineRuns: PipelineRunKubeObjectInterface[];
  isLoading: boolean;
  filterFunction: (item: PipelineRunKubeObjectInterface) => boolean;
}
