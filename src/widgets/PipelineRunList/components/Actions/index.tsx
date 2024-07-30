import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { PermissionSet } from '../../../../types/permissions';
import { PipelineRunActionsMenu } from '../../../PipelineRunActionsMenu';

export const Actions = ({
  resource,
  permissions,
}: {
  resource: PipelineRunKubeObjectInterface;
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
        <PipelineRunActionsMenu
          variant="menu"
          permissions={permissions}
          data={{
            pipelineRun: resource,
          }}
          anchorEl={anchor}
          handleCloseResourceActionListMenu={() => setAnchor(null)}
        />
      ) : null}
    </>
  );
};
