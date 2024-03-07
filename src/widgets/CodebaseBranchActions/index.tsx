import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { EDPCodebaseBranchKubeObject } from '../../k8s/EDPCodebaseBranch';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseBranchActionsProps } from './types';
import { createDeleteAction } from './utils';

export const CodebaseBranchActionsMenu = ({
  data: { defaultBranch, codebaseData, branch },
  variant,
  handleCloseResourceActionListMenu,
  anchorEl,
}: CodebaseBranchActionsProps) => {
  const { setDialog } = useDialogContext<DeleteKubeObjectDialogForwardedProps>();

  const conflictedCDPipeline = useConflictedCDPipeline(branch, codebaseData);

  const onBeforeSubmit = React.useCallback(
    async (handleError, setLoadingActive) => {
      setLoadingActive(true);
      if (!conflictedCDPipeline) {
        setLoadingActive(false);
        return;
      }

      handleError(
        <CodebaseBranchCDPipelineConflictError
          conflictedCDPipeline={conflictedCDPipeline}
          name={branch?.spec.branchName}
        />
      );
      setLoadingActive(false);
    },
    [branch?.spec.branchName, conflictedCDPipeline]
  );

  return variant === ACTION_MENU_TYPES.INLINE ? (
    <ActionsInlineList
      actions={[
        createDeleteAction(branch, defaultBranch, () => {
          setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: {
              objectName: branch?.spec?.branchName,
              kubeObject: EDPCodebaseBranchKubeObject,
              kubeObjectData: branch,
              description: `Confirm the deletion of the codebase branch with all its components`,
              onBeforeSubmit,
            },
          });
        }),
      ].filter(Boolean)}
    />
  ) : variant === ACTION_MENU_TYPES.MENU ? (
    <ActionsMenuList
      actions={[
        createDeleteAction(branch, defaultBranch, () => {
          handleCloseResourceActionListMenu();
          setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: {
              objectName: branch?.spec?.branchName,
              kubeObject: EDPCodebaseBranchKubeObject,
              kubeObjectData: branch,
              description: `Confirm the deletion of the codebase branch with all its components`,
              onBeforeSubmit,
            },
          });
        }),
      ].filter(Boolean)}
      anchorEl={anchorEl}
    />
  ) : null;
};
