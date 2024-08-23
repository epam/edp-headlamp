import { Icon } from '@iconify/react';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/NewDialog/hooks';
import { ManageCodebaseBranchDialog } from '../../../../../../widgets/dialogs/ManageCodebaseBranch';
import { useDynamicDataContext } from '../../../../providers/DynamicData/hooks';
import { usePermissionsContext } from '../../../../providers/Permissions/hooks';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ codebase, defaultBranch }: TableHeaderActionsProps) => {
  const { setDialog } = useDialogContext();
  const {
    pipelines: { data: pipelines },
  } = useDynamicDataContext();
  const { codebaseBranch: codebaseBranchPermissions } = usePermissionsContext();

  return (
    <ButtonWithPermission
      ButtonProps={{
        startIcon: <Icon icon={ICONS.PLUS} />,
        color: 'primary',
        variant: 'contained',
        onClick: () => {
          setDialog(ManageCodebaseBranchDialog, {
            codebase,
            defaultBranch,
            pipelines,
          });
        },
      }}
      allowed={codebaseBranchPermissions.create}
      text="You do not have permission to create a branch."
    >
      Create branch
    </ButtonWithPermission>
  );
};
