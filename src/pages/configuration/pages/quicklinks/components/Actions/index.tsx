import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';
import { PermissionsConfig } from '../../../../../../providers/Permissions/types';
import { QuickLinkActionsMenu } from '../../../../../../widgets/QuickLinkActionsMenu';
import { pagePermissionsToCheck } from '../../constants';

export const Actions = ({
  resource,
  permissions,
}: {
  resource: QuickLinkKubeObjectInterface;
  permissions: PermissionsConfig<typeof pagePermissionsToCheck>;
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
