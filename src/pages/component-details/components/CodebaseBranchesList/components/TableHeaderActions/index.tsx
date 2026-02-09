import { Icon } from '@iconify/react';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { ManageCodebaseBranchDialog } from '../../../../../../widgets/dialogs/ManageCodebaseBranch';
import { useTypedPermissions } from '../../../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../../../providers/DynamicData/hooks';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ codebase, defaultBranch }: TableHeaderActionsProps) => {
  const { setDialog } = useDialogContext();
  const {
    pipelines: { data: pipelines },
    codebaseBranches: { data: codebaseBranches },
  } = useDynamicDataContext();
  const permissions = useTypedPermissions();

  return (
    codebaseBranches && (
      <ButtonWithPermission
        ButtonProps={{
          startIcon: <Icon icon={ICONS.PLUS} />,
          color: 'primary',
          variant: 'contained',
          onClick: () => {
            setDialog(ManageCodebaseBranchDialog, {
              codebaseBranches,
              codebase,
              defaultBranch,
              pipelines,
            });
          },
        }}
        disabled={!permissions.create.CodebaseBranch.allowed}
        reason={permissions.create.CodebaseBranch.reason}
      >
        Create branch
      </ButtonWithPermission>
    )
  );
};
