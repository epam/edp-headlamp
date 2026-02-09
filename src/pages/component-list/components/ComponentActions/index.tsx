import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { PermissionsConfig } from '../../../../providers/Permissions/types';
import { CodebaseActionsMenu } from '../../../../widgets/CodebaseActionsMenu';
import { permissionsToCheckConfig } from '../../constants';

export const Actions = ({
  resource,
  permissions,
  disabled,
}: {
  resource: CodebaseKubeObjectInterface;
  permissions: PermissionsConfig<typeof permissionsToCheckConfig>;
  disabled?: {
    boolean: boolean;
    reason: string;
  };
}) => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const [anchor, setAnchor] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);

  return (
    <>
      <ConditionalWrapper
        condition={!!disabled?.boolean}
        wrapper={(children) => (
          <Tooltip title={disabled?.reason}>
            <div>{children}</div>
          </Tooltip>
        )}
      >
        <IconButton
          ref={buttonRef}
          aria-label={'Options'}
          onClick={(e) => setAnchor(e.currentTarget)}
          size="medium"
          disabled={disabled?.boolean}
        >
          <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
        </IconButton>
      </ConditionalWrapper>
      {anchor && !disabled?.boolean ? (
        <CodebaseActionsMenu
          variant="menu"
          data={{
            codebaseData: resource,
          }}
          permissions={permissions}
          anchorEl={anchor}
          handleCloseResourceActionListMenu={() => setAnchor(null)}
        />
      ) : null}
    </>
  );
};
