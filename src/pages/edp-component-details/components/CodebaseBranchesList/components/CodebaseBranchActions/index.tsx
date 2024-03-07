import React from 'react';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { CodebaseBranchActionsMenu } from '../../../../../../widgets/CodebaseBranchActions';
import { CodebaseBranchActionsProps } from './types';

export const CodebaseBranchActions = ({
  defaultBranch,
  codebaseData,
}: CodebaseBranchActionsProps) => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCodebaseBranchKubeObjectInterface>();

  return (
    <CodebaseBranchActionsMenu
      variant="menu"
      data={{
        branch: data,
        defaultBranch,
        codebaseData,
      }}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
    />
  );
};
