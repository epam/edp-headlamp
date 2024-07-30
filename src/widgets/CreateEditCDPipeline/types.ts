import { CDPipelineKubeObjectInterface } from '../../k8s/groups/EDP/CDPipeline/types';
import { FormMode, FormValues } from '../../types/forms';
import { CDPIPELINE_FORM_NAMES } from './names';

export type CreateEditCDPipelineFormValues = FormValues<typeof CDPIPELINE_FORM_NAMES>;

export interface CreateEditCDPipelineDialogForwardedProps {
  mode: FormMode;
  CDPipelineData?: CDPipelineKubeObjectInterface;
}
