import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { useDialogContext as useNewDialogContext } from '../../providers/Dialog/hooks';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObjectDialog } from '../dialogs/DeleteKubeObject';
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

  const isDefaultBranch = branch.spec.branchName === defaultBranchName;

  const actions = React.useMemo(() => {
    if (!branch) {
      return [];
    }

    return [
      createKubeAction({
        name: RESOURCE_ACTIONS.EDIT,
        disabled: {
          status: permissions.update === false,
          reason: 'You do not have permission to edit a Deployment Flow',
        },
        icon: ICONS.PENCIL,
        action: () => {
          if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

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
      createKubeAction({
        name: RESOURCE_ACTIONS.DELETE,
        icon: ICONS.BUCKET,
        disabled: {
          status: isDefaultBranch ? true : permissions.delete === false,
          reason: isDefaultBranch
            ? 'You cannot delete the default branch'
            : 'You do not have permission to delete a branch',
        },
        action: () => {
          if (variant === ACTION_MENU_TYPES.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setNewDialog(DeleteKubeObjectDialog, {
            objectName: branch?.spec?.branchName,
            kubeObject: CodebaseBranchKubeObject,
            kubeObjectData: branch,
            description: `Confirm the deletion of the codebase branch with all its components`,
            onBeforeSubmit,
          });
        },
      }),
    ];
  }, [
    branch,
    codebaseData,
    defaultBranch,
    handleCloseResourceActionListMenu,
    isDefaultBranch,
    onBeforeSubmit,
    permissions.delete,
    permissions.update,
    pipelines?.build,
    pipelines?.review,
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
