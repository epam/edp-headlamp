import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/QuickLink/types';

export interface DialogHeaderProps {
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorData: React.Dispatch<React.SetStateAction<QuickLinkKubeObjectInterface>>;
}
