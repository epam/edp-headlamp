import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { TaskKubeObjectInterface } from '../../../../k8s/groups/Tekton/Task/types';
import { TaskActionsMenu } from '../../../TaskActionsMenu';
import { WidgetPermissions } from '../../types';

export const Actions = ({
  resource,
  permissions,
}: {
  resource: TaskKubeObjectInterface;
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
      <TaskActionsMenu
        variant="menu"
        permissions={permissions}
        data={{
          task: resource?.jsonData || resource,
        }}
        anchorEl={anchor}
        handleCloseResourceActionListMenu={() => setAnchor(null)}
      />
    </>
  );
};
