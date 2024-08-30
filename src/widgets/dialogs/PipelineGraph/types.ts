import { PipelineKubeObjectInterface } from '../../../k8s/groups/Tekton/Pipeline/types';
import { DialogProps } from '../../../providers/Dialog/types';

export interface PipelineGraphDialogProps
  extends DialogProps<{
    pipeline: PipelineKubeObjectInterface;
  }> {}
