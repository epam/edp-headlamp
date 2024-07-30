import React from 'react';
import { CDPipelineKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CDPipeline/types';

export interface DialogHeaderProps {
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorData: React.Dispatch<React.SetStateAction<CDPipelineKubeObjectInterface>>;
}
