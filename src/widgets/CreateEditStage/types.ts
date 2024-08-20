import { CDPipelineKubeObjectInterface } from '../../k8s/groups/EDP/CDPipeline/types';
import { StageKubeObjectInterface } from '../../k8s/groups/EDP/Stage/types';
import { FormMode, FormValues } from '../../types/forms';
import { STAGE_FORM_NAMES } from './names';

export type CreateEditStageFormValues = FormValues<typeof STAGE_FORM_NAMES>;

export interface CreateEditStageDialogForwardedProps {
  mode: FormMode;
  CDPipelineData: CDPipelineKubeObjectInterface;
  otherStages: StageKubeObjectInterface[];
  stage?: StageKubeObjectInterface;
}
