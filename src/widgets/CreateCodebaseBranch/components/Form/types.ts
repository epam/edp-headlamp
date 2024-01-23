import React from 'react';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';

export interface FormProps {
  editorOpen: boolean;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorData: EDPCodebaseBranchKubeObjectInterface;
  defaultBranchVersion: string;
}
