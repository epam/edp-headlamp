import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { PermissionSet } from '../../../../types/permissions';
import { CDPipelineActionsMenu } from '../../../../widgets/CDPipelineActionsMenu';

export const Actions = ({
  resource,
  permissions,
}: {
  resource: CDPipelineKubeObjectInterface;
  permissions: PermissionSet;
}) => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const [anchor, setAnchor] = React.useState<EventTarget & HTMLButtonElement>(null);

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
      {anchor ? (
        <CDPipelineActionsMenu
          variant="menu"
          data={{
            CDPipelineData: resource,
          }}
          permissions={permissions}
          anchorEl={anchor}
          handleCloseResourceActionListMenu={() => setAnchor(null)}
        />
      ) : null}
    </>
  );
};
