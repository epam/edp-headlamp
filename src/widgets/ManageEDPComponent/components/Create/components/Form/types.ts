import React from 'react';
import { EDPComponentKubeObjectInterface } from '../../../../../../k8s/EDPComponent/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: EDPComponentKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
