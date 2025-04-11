import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { CodebaseBranchActionsMenu } from '../../../../../../../../widgets/CodebaseBranchActionsMenu';
import { useTypedPermissions } from '../../../../../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../../../../../providers/DynamicData/hooks';
import { ActionsProps } from './types';

export const Actions = ({ codebaseBranchData }: ActionsProps) => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const [anchor, setAnchor] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);

  const permissions = useTypedPermissions();

  const {
    codebaseBranches: { data: codebaseBranches },
    component: { data: codebaseData },
    pipelines: { data: pipelines },
  } = useDynamicDataContext();

  //@ts-ignore
  const defaultBranch = codebaseBranches?.[0]?.jsonData ?? codebaseBranches?.[0];

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
      <CodebaseBranchActionsMenu
        variant="menu"
        data={{
          branch: codebaseBranchData,
          defaultBranch,
          codebaseData: codebaseData!,
          pipelines,
        }}
        permissions={permissions}
        anchorEl={anchor}
        handleCloseResourceActionListMenu={() => setAnchor(null)}
      />
    </>
  );
};
