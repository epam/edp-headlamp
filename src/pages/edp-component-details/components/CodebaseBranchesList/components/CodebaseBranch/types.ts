import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';

export interface CodebaseBranchProps {
  codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
  expandedPanel: string;
  id: string;
  codebaseData: EDPCodebaseKubeObjectInterface;
  handlePanelChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
