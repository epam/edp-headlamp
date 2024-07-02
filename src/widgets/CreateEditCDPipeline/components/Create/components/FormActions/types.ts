import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface FormActionsProps {
  setStages: React.Dispatch<React.SetStateAction<EDPCDPipelineStageKubeObjectInterface[]>>;
  stages: EDPCDPipelineStageKubeObjectInterface[];
}
