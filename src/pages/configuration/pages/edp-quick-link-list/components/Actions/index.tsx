import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';
import { PermissionSet } from '../../../../../../types/permissions';
import { QuickLinkActionsMenu } from '../../../../../../widgets/QuickLinkActionsMenu';

export const Actions = ({
  resource,
  permissions,
}: {
  resource: QuickLinkKubeObjectInterface;
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
        <QuickLinkActionsMenu
          variant="menu"
          data={resource}
          permissions={permissions}
          anchorEl={anchor}
          handleCloseResourceActionListMenu={() => setAnchor(null)}
        />
      ) : null}
    </>
  );
};
