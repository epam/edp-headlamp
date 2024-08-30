import { CDPipelineKubeObjectInterface } from '../../../k8s/groups/EDP/CDPipeline/types';
import { DialogProps } from '../../../providers/Dialog/types';
import { FormValues } from '../../../types/forms';
import { CDPIPELINE_FORM_NAMES } from './names';

export type ManageCDPipelineFormValues = FormValues<typeof CDPIPELINE_FORM_NAMES>;

export interface ManageCDPipelineDialogProps
  extends DialogProps<{
    CDPipelineData?: CDPipelineKubeObjectInterface;
  }> {}
