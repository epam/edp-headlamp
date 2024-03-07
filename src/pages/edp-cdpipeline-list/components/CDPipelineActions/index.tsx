import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CDPipelineActionsMenu } from '../../../../widgets/CDPipelineActionsMenu';

export const CDPipelineActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCDPipelineKubeObjectInterface>();

  return (
    <CDPipelineActionsMenu
      variant="menu"
      data={{
        CDPipelineData: data,
      }}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
    />
  );
};
