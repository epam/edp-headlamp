import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ActionsInlineList } from '../../components/ActionsInlineList';
import { ActionsMenuList } from '../../components/ActionsMenuList';
import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseBranchKubeObject } from '../../k8s/EDPCodebaseBranch';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseBranchActionsProps } from './types';

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

  const getActions = React.useCallback(async () => {
    if (!branch) {
      return [];
    }
    if (variant === ACTION_MENU_TYPES.INLINE) {
      return [
        ...(branch.spec.branchName === defaultBranch
          ? [
              await createKubeAction({
                item: new EDPCodebaseBranchKubeObject(branch) as unknown as KubeObjectInterface,
                authActionName: 'delete',
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
                      kubeObject: EDPCodebaseBranchKubeObject,
                      kubeObjectData: branch,
                      description: `Confirm the deletion of the codebase branch with all its components`,
                      onBeforeSubmit,
                    },
                  });
                },
              }),
            ]
          : [
              await createKubeAction({
                item: new EDPCodebaseBranchKubeObject(branch) as unknown as KubeObjectInterface,
                authActionName: 'delete',
                name: RESOURCE_ACTIONS.DELETE,
                icon: ICONS.BUCKET,
                action: () => {
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
                },
              }),
            ]),
      ];
    } else {
      return [
        ...(branch.spec.branchName === defaultBranch
          ? [
              await createKubeAction({
                item: new EDPCodebaseBranchKubeObject(branch) as unknown as KubeObjectInterface,
                authActionName: 'delete',
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
                      kubeObject: EDPCodebaseBranchKubeObject,
                      kubeObjectData: branch,
                      description: `Confirm the deletion of the codebase branch with all its components`,
                      onBeforeSubmit,
                    },
                  });
                },
              }),
            ]
          : [
              await createKubeAction({
                item: new EDPCodebaseBranchKubeObject(branch) as unknown as KubeObjectInterface,
                authActionName: 'delete',
                name: RESOURCE_ACTIONS.DELETE,
                icon: ICONS.BUCKET,
                action: () => {
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
                },
              }),
            ]),
      ];
    }
  }, [
    branch,
    defaultBranch,
    handleCloseResourceActionListMenu,
    onBeforeSubmit,
    setDialog,
    variant,
  ]);

  const [actions, setActions] = React.useState([]);

  React.useEffect(() => {
    getActions().then((actions) => {
      if (actions.length === 0) {
        return;
      }

      setActions(actions);
    });
  }, [actions.length, getActions]);

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
