import React from 'react';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/CodebaseBranch/types';

export interface FormProps {
  editorOpen: boolean;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorData: CodebaseBranchKubeObjectInterface;
}
