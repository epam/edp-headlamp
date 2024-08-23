import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useDialogContext as useNewDialogContext } from '../../providers/NewDialog/hooks';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { ManageCodebaseBranchDialog } from '../dialogs/ManageCodebaseBranch';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseBranchActionsProps } from './types';

export const CodebaseBranchActionsMenu = ({
  data: { defaultBranch, codebaseData, branch, pipelines },
  variant,
  handleCloseResourceActionListMenu,
  anchorEl,
  permissions,
}: CodebaseBranchActionsProps) => {
  const { setDialog } = useDialogContext<DeleteKubeObjectDialogForwardedProps>();
  const { setDialog: setNewDialog } = useNewDialogContext();

  const defaultBranchName = defaultBranch?.spec.branchName;

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

  const actions = React.useMemo(() => {
    if (!branch) {
      return [];
    }

    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to edit a Deployment Flow',
          },
          icon: ICONS.PENCIL,
          action: () => {
            setNewDialog(ManageCodebaseBranchDialog, {
              codebase: codebaseData,
              defaultBranch,
              codebaseBranch: branch,
              pipelines: {
                review: pipelines?.review,
                build: pipelines?.build,
              },
            });
          },
        }),
        ...(branch.spec.branchName === defaultBranchName
          ? [
              createKubeAction({
                name: RESOURCE_ACTIONS.DELETE,
                disabled: {
                  status: true,
                  reason: 'You cannot delete the default branch',
                },
                icon: ICONS.BUCKET,
                action: () => {
                  setDialog({
                    modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
                    forwardedProps: {
                      objectName: branch?.spec?.branchName,
                      kubeObject: CodebaseBranchKubeObject,
                      kubeObjectData: branch,
                      description: `Confirm the deletion of the codebase branch with all its components`,
                      onBeforeSubmit,
                    },
                  });
                },
              }),
            ]
          : [
              createKubeAction({
                name: RESOURCE_ACTIONS.DELETE,
                icon: ICONS.BUCKET,
                disabled: {
                  status: permissions.delete === false,
                  reason: 'You do not have permission to delete a branch',
                },
                action: () => {
                  setDialog({
                    modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
                    forwardedProps: {
                      objectName: branch?.spec?.branchName,
                      kubeObject: CodebaseBranchKubeObject,
                      kubeObjectData: branch,
                      description: `Confirm the deletion of the codebase branch with all its components`,
                      onBeforeSubmit,
                    },
                  });
                },
              }),
            ]),
      ];
    } else {
      return [
        createKubeAction({
          name: RESOURCE_ACTIONS.EDIT,
          disabled: {
            status: permissions.update === false,
            reason: 'You do not have permission to edit a Deployment Flow',
          },
          icon: ICONS.PENCIL,
          action: () => {
            handleCloseResourceActionListMenu();

            setNewDialog(ManageCodebaseBranchDialog, {
              codebase: codebaseData,
              defaultBranch,
              codebaseBranch: branch,
              pipelines: {
                review: pipelines?.review,
                build: pipelines?.build,
              },
            });
          },
        }),
        ...(branch.spec.branchName === defaultBranchName
          ? [
              createKubeAction({
                name: RESOURCE_ACTIONS.DELETE,
                disabled: {
                  status: true,
                  reason: 'You cannot delete the default branch',
                },
                icon: ICONS.BUCKET,
                action: () => {
                  handleCloseResourceActionListMenu();

                  setDialog({
                    modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
                    forwardedProps: {
                      objectName: branch?.spec?.branchName,
                      kubeObject: CodebaseBranchKubeObject,
                      kubeObjectData: branch,
                      description: `Confirm the deletion of the codebase branch with all its components`,
                      onBeforeSubmit,
                    },
                  });
                },
              }),
            ]
          : [
              createKubeAction({
                name: RESOURCE_ACTIONS.DELETE,
                icon: ICONS.BUCKET,
                disabled: {
                  status: permissions.delete === false,
                  reason: 'You do not have permission to delete a branch',
                },
                action: () => {
                  handleCloseResourceActionListMenu();

                  setDialog({
                    modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
                    forwardedProps: {
                      objectName: branch?.spec?.branchName,
                      kubeObject: CodebaseBranchKubeObject,
                      kubeObjectData: branch,
                      description: `Confirm the deletion of the codebase branch with all its components`,
                      onBeforeSubmit,
                    },
                  });
                },
              }),
            ]),
      ];
    }
  }, [
    branch,
    codebaseData,
    defaultBranch,
    defaultBranchName,
    handleCloseResourceActionListMenu,
    onBeforeSubmit,
    permissions.delete,
    permissions.update,
    pipelines?.build,
    pipelines?.review,
    setDialog,
    setNewDialog,
    variant,
  ]);

  return variant === ACTION_MENU_TYPES.INLINE ? (
    <ActionsInlineList actions={actions} />
  ) : variant === ACTION_MENU_TYPES.MENU ? (
    <ActionsMenuList
      actions={actions}
      anchorEl={anchorEl}
      handleCloseActionsMenu={handleCloseResourceActionListMenu}
    />
  ) : null;
};
