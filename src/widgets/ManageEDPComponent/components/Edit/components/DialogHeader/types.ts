import React from 'react';
import { EDPComponentKubeObjectInterface } from '../../../../../../k8s/EDPComponent/types';

export interface DialogHeaderProps {
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorData: React.Dispatch<React.SetStateAction<EDPComponentKubeObjectInterface>>;
}
