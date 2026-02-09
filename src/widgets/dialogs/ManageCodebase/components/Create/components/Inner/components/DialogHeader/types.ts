import React from 'react';
import { CodebaseKubeObjectInterface } from '../../../../../../../../../k8s/groups/EDP/Codebase/types';

export interface DialogHeaderProps {
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorData: React.Dispatch<React.SetStateAction<CodebaseKubeObjectInterface>>;
}
