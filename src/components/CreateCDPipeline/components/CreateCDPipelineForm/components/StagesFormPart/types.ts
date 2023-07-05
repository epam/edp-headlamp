import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../../types/global';

export interface StagesFormPartProps {
    setCreateStageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
    onStageDelete: (idx: number) => void;
}
