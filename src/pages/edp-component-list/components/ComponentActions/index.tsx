import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CodebaseActionsMenu } from '../../../../widgets/CodebaseActionsMenu';
import { usePermissionsContext } from '../../providers/Permissions/hooks';

export const ComponentActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCodebaseKubeObjectInterface>();

  const { codebase: codebasePermissions } = usePermissionsContext();

  return (
    <CodebaseActionsMenu
      variant="menu"
      data={{
        codebaseData: data,
      }}
      permissions={codebasePermissions}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
    />
  );
};
