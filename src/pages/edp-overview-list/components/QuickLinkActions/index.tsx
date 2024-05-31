import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/QuickLink/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { QuickLinkActionsMenu } from '../../../../widgets/QuickLinkActionsMenu';
import { usePermissionsContext } from '../../providers/Permissions/hooks';

export const QuickLinkActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<QuickLinkKubeObjectInterface>();

  const { quickLink: quickLinkPermissions } = usePermissionsContext();

  return (
    <QuickLinkActionsMenu
      data={data}
      permissions={quickLinkPermissions}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
      variant="menu"
    />
  );
};
