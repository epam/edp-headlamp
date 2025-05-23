import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPE } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CodebaseBranchKubeObject } from '../../k8s/groups/EDP/CodebaseBranch';
import { useDialogContext as useNewDialogContext } from '../../providers/Dialog/hooks';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { DeleteKubeObjectDialog } from '../dialogs/DeleteKubeObject';
import { ManageCodebaseBranchDialog } from '../dialogs/ManageCodebaseBranch';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseBranchActionsProps } from './types';

export const CodebaseBranchActionsMenu = ({
  data: { defaultBranch, codebaseData, codebaseBranches, branch, pipelines },
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
      createResourceAction({
        type: RESOURCE_ACTION.EDIT,
        label: capitalizeFirstLetter(RESOURCE_ACTION.EDIT),
        item: branch,
        icon: ICONS.PENCIL,
        disabled: {
          status: !permissions.update.CodebaseBranch.allowed,
          reason: permissions.update.CodebaseBranch.reason,
        },
        callback: (branch) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
            handleCloseResourceActionListMenu();
          }

          setNewDialog(ManageCodebaseBranchDialog, {
            codebaseBranches,
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
      createResourceAction({
        type: RESOURCE_ACTION.DELETE,
        label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
        item: branch,
        icon: ICONS.BUCKET,
        disabled: {
          status: isDefaultBranch ? true : !permissions?.delete?.CodebaseBranch.allowed,
          reason: isDefaultBranch
            ? 'You cannot delete the default branch'
            : permissions?.delete?.CodebaseBranch.reason,
        },
        callback: (branch) => {
          if (variant === ACTION_MENU_TYPE.MENU && handleCloseResourceActionListMenu) {
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
    codebaseBranches,
    codebaseData,
    defaultBranch,
    handleCloseResourceActionListMenu,
    isDefaultBranch,
    onBeforeSubmit,
    permissions?.delete?.CodebaseBranch.allowed,
    permissions?.delete?.CodebaseBranch.reason,
    permissions.update.CodebaseBranch.allowed,
    permissions.update.CodebaseBranch.reason,
    pipelines?.build,
    pipelines?.review,
    setNewDialog,
    variant,
  ]);

  return variant === ACTION_MENU_TYPE.INLINE ? (
    <ActionsInlineList actions={actions} />
  ) : variant === ACTION_MENU_TYPE.MENU ? (
    <ActionsMenuList
      actions={actions}
      anchorEl={anchorEl!}
      handleCloseActionsMenu={handleCloseResourceActionListMenu!}
    />
  ) : null;
};
