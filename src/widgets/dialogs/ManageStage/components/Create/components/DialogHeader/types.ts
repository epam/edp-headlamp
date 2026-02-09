import React from 'react';
import { StageKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Stage/types';

export interface DialogHeaderProps {
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorData: React.Dispatch<React.SetStateAction<StageKubeObjectInterface>>;
}
