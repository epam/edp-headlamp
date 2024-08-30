import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { DialogProps } from '../../../providers/Dialog/types';

export interface PipelineRunGraphDialogProps
  extends DialogProps<{
    pipelineRun: PipelineRunKubeObjectInterface;
  }> {}
