import React from 'react';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { CodebaseBranchActionsMenu } from '../../../../../../widgets/CodebaseBranchActions';
import { usePermissionsContext } from '../../../../providers/Permissions/hooks';
import { CodebaseBranchActionsProps } from './types';

export const CodebaseBranchActions = ({
  defaultBranch,
  codebaseData,
}: CodebaseBranchActionsProps) => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCodebaseBranchKubeObjectInterface>();

  const { codebaseBranch: codebaseBranchPermissions } = usePermissionsContext();

  return (
    <CodebaseBranchActionsMenu
      variant="menu"
      data={{
        branch: data,
        defaultBranch,
        codebaseData,
      }}
      permissions={codebaseBranchPermissions}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
    />
  );
};
