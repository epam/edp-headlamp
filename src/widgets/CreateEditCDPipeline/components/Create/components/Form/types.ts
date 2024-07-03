import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../k8s/EDPCDPipeline/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: EDPCDPipelineKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
