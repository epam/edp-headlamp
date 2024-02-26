import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/QuickLink/types';

export interface DialogHeaderProps {
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorData: React.Dispatch<React.SetStateAction<QuickLinkKubeObjectInterface>>;
}
