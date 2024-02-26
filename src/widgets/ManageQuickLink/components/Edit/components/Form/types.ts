import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/QuickLink/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: QuickLinkKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
