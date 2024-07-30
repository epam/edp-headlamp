import React from 'react';
import { CodebaseKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Codebase/types';

export interface FormProps {
  editorOpen: boolean;
  editorData: CodebaseKubeObjectInterface;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
