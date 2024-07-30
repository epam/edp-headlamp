import React from 'react';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { CodebaseBranchActionsMenu } from '../../../../../../widgets/CodebaseBranchActions';
import { usePermissionsContext } from '../../../../providers/Permissions/hooks';
import { CodebaseBranchActionsProps } from './types';

export const CodebaseBranchActions = ({
  defaultBranch,
  codebaseData,
}: CodebaseBranchActionsProps) => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<CodebaseBranchKubeObjectInterface>();

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
