import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface DialogHeaderProps {
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditorData: React.Dispatch<React.SetStateAction<EDPCDPipelineStageKubeObjectInterface>>;
}
