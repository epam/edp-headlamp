import { Icon } from '@iconify/react';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../../../../../widgets/CreateCodebaseBranch/constants';
import { CreateCodebaseBranchDialogForwardedProps } from '../../../../../../widgets/CreateCodebaseBranch/types';
import { usePermissionsContext } from '../../../../providers/Permissions/hooks';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ codebase, defaultBranch }: TableHeaderActionsProps) => {
  const { setDialog } = useDialogContext<CreateCodebaseBranchDialogForwardedProps>();
  const { codebaseBranch: codebaseBranchPermissions } = usePermissionsContext();

  return (
    <ButtonWithPermission
      ButtonProps={{
        startIcon: <Icon icon={ICONS.PLUS} />,
        color: 'primary',
        variant: 'contained',
        onClick: () => {
          setDialog({
            modalName: CREATE_CODEBASE_BRANCH_DIALOG_NAME,
            forwardedProps: {
              codebase,
              defaultBranch,
            },
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
