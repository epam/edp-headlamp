import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/QuickLink/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { QuickLinkActionsMenu } from '../../../../widgets/QuickLinkActionsMenu';

export const QuickLinkActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<QuickLinkKubeObjectInterface>();

  return (
    <QuickLinkActionsMenu
      data={data}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
      variant="menu"
    />
  );
};
