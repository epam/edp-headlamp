import React from 'react';
import { StageKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Stage/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: StageKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
