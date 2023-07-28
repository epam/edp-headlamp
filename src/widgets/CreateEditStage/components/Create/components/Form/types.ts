import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface FormProps {
    editorOpen: boolean;
    editorData: EDPCDPipelineStageKubeObjectInterface;
    setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
