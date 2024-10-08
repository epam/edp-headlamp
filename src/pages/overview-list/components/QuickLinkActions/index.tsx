import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { QuickLinkActionsMenu } from '../../../../widgets/QuickLinkActionsMenu';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';

export const QuickLinkActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<QuickLinkKubeObjectInterface>();

  const permissions = useTypedPermissions();

  return (
    <QuickLinkActionsMenu
      data={data}
      permissions={permissions}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
      variant="menu"
    />
  );
};
