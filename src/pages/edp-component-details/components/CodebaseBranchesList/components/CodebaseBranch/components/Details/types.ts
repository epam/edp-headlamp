import { EDPCodebaseKubeObjectInterface } from '../../../../../../../../k8s/EDPCodebase/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/PipelineRun/types';

export interface DetailsProps {
  codebaseData: EDPCodebaseKubeObjectInterface;
  pipelineRuns: {
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  };
}
