import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';

export interface PipelineRunGraphProps {
  pipelineRun: PipelineRunKubeObjectInterface;
  onNodeElementLinkClick?: () => void;
}
