import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface FormActionsProps {
    setFormActiveTabIdx: React.Dispatch<React.SetStateAction<number>>;
    formActiveTabIdx: number;
    setStages: React.Dispatch<React.SetStateAction<EDPCDPipelineStageKubeObjectInterface[]>>;
    stages: EDPCDPipelineStageKubeObjectInterface[];
}
