import React from 'react';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodebaseBranch/types';

export interface CodebaseBranchProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  expandedPanel: string | null;
  id: string;
  handlePanelChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
