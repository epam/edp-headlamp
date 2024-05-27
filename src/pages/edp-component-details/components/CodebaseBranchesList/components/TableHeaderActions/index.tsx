import { Icon } from '@iconify/react';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { EDPCodebaseBranchKubeObject } from '../../../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectConfig } from '../../../../../../k8s/EDPCodebaseBranch/config';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../../../../../widgets/CreateCodebaseBranch/constants';
import { CreateCodebaseBranchDialogForwardedProps } from '../../../../../../widgets/CreateCodebaseBranch/types';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ codebase, defaultBranch }: TableHeaderActionsProps) => {
  const { setDialog } = useDialogContext<CreateCodebaseBranchDialogForwardedProps>();

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
      actionCheckName={'create'}
      item={
        new EDPCodebaseBranchKubeObject({
          kind: EDPCodebaseBranchKubeObjectConfig.kind,
          apiVersion: `${EDPCodebaseBranchKubeObjectConfig.group}/${EDPCodebaseBranchKubeObjectConfig.version}`,
          // @ts-ignore
          metadata: {
            namespace: getDefaultNamespace(),
          },
        })
      }
    >
      Create branch
    </ButtonWithPermission>
  );
};
