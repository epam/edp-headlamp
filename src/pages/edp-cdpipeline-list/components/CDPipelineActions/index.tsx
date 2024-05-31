import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CDPipelineActionsMenu } from '../../../../widgets/CDPipelineActionsMenu';
import { usePermissionsContext } from '../../providers/Permissions/hooks';

export const CDPipelineActions = () => {
  const { data, anchorEl, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCDPipelineKubeObjectInterface>();

  const { cdPipeline: CDPipelinePermissions } = usePermissionsContext();

  return (
    <CDPipelineActionsMenu
      variant="menu"
      data={{
        CDPipelineData: data,
      }}
      permissions={CDPipelinePermissions}
      anchorEl={anchorEl}
      handleCloseResourceActionListMenu={handleCloseResourceActionListMenu}
    />
  );
};
