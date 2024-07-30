import React from 'react';
import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodebaseBranch/types';

export interface CodebaseBranchProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  expandedPanel: string;
  id: string;
  codebaseData: CodebaseKubeObjectInterface;
  handlePanelChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  defaultBranch: string;
}
