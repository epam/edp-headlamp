import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { FormMode, FormValues } from '../../types/forms';
import { STAGE_FORM_NAMES } from './names';

export type CreateEditStageFormValues = FormValues<typeof STAGE_FORM_NAMES>;

export interface CreateEditStageDialogForwardedProps {
    mode: FormMode;
    CDPipelineData?: EDPCDPipelineKubeObjectInterface;
    ciTool: string;
    otherStages: EDPCDPipelineStageKubeObjectInterface[];
    stage?: EDPCDPipelineStageKubeObjectInterface;
    handleApply?: ({
        CDPipelineStageData,
    }: {
        CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
    }) => void;
}
