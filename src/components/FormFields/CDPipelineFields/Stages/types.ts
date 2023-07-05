import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../types/global';

export interface StagesProps {
    stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
    setCreateStageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onStageDelete: (idx: number) => void;
}
