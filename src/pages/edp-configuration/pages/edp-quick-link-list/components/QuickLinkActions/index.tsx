import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../k8s/EDPCDPipeline/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { QuickLinkActionsMenu } from '../../../../../../widgets/QuickLinkActionsMenu';

export const CDPipelineActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCDPipelineKubeObjectInterface>();

  return (
    <QuickLinkActionsMenu
      data={data}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
      variant="menu"
    />
  );
};
