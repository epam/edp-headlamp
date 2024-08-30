import React from 'react';
import { CDPipelineKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/CDPipeline/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: CDPipelineKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
