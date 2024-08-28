import { CDPipelineKubeObjectInterface } from '../../../k8s/groups/EDP/CDPipeline/types';
import { StageKubeObjectInterface } from '../../../k8s/groups/EDP/Stage/types';
import { DialogProps } from '../../../providers/NewDialog/context';
import { FormValues } from '../../../types/forms';
import { STAGE_FORM_NAMES } from './names';

export interface ManageStageDialogProps
  extends DialogProps<{
    CDPipelineData: CDPipelineKubeObjectInterface;
    otherStages: StageKubeObjectInterface[];
    stage?: StageKubeObjectInterface;
  }> {}

export type ManageStageFormValues = FormValues<typeof STAGE_FORM_NAMES>;