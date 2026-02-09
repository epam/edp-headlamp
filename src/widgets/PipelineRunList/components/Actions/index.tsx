import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { PipelineRunActionsMenu } from '../../../PipelineRunActionsMenu';
import { WidgetPermissions } from '../../types';

export const Actions = ({
  resource,
  permissions,
}: {
  resource: PipelineRunKubeObjectInterface;
  permissions: WidgetPermissions;
}) => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const [anchor, setAnchor] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);

  return (
    <>
      <IconButton
        ref={buttonRef}
        aria-label={'Options'}
        onClick={(e) => setAnchor(e.currentTarget)}
        size="large"
      >
        <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
      </IconButton>
      <PipelineRunActionsMenu
        variant="menu"
        permissions={permissions}
        data={{
          pipelineRun: resource?.jsonData || resource,
        }}
        anchorEl={anchor}
        handleCloseResourceActionListMenu={() => setAnchor(null)}
      />
    </>
  );
};
