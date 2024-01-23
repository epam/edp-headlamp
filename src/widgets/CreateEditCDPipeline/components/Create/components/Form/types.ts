import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: EDPCDPipelineKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formActiveTabIdx: number;
  stages: EDPCDPipelineStageKubeObjectInterface[];
  setStages: React.Dispatch<React.SetStateAction<EDPCDPipelineStageKubeObjectInterface[]>>;
}
