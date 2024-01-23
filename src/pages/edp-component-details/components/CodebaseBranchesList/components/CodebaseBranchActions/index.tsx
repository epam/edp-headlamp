import React from 'react';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { EDPCodebaseBranchKubeObject } from '../../../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../../../../../types/actions';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../../../../widgets/DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../../../../widgets/DeleteKubeObject/types';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseBranchActionsProps } from './types';
import { createDeleteAction } from './utils';

export const CodebaseBranchActions = ({ defaultBranch, codebase }: CodebaseBranchActionsProps) => {
  const { setDialog } = useDialogContext<DeleteKubeObjectDialogForwardedProps>();
  const { anchorEl, data, handleCloseResourceActionListMenu } =
    useResourceActionListContext<EDPCodebaseBranchKubeObjectInterface>();

  const conflictedCDPipeline = useConflictedCDPipeline(data, codebase);

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
          name={data?.spec.branchName}
        />
      );
      setLoadingActive(false);
    },
    [conflictedCDPipeline, data?.spec.branchName]
  );

  const actions: KubeObjectAction[] = React.useMemo(() => {
    if (!data) {
      return;
    }

    return [
      createDeleteAction(data, defaultBranch, () => {
        handleCloseResourceActionListMenu();
        setDialog({
          modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
          forwardedProps: {
            objectName: data?.spec?.branchName,
            kubeObject: EDPCodebaseBranchKubeObject,
            kubeObjectData: data,
            description: `Confirm the deletion of the codebase branch with all its components`,
            onBeforeSubmit,
          },
        });
      }),
    ].filter(Boolean);
  }, [data, defaultBranch, handleCloseResourceActionListMenu, setDialog, onBeforeSubmit]);

  return (
    <>
      <KubeObjectActions
        anchorEl={anchorEl}
        handleCloseActionsMenu={handleCloseResourceActionListMenu}
        actions={actions}
      />
    </>
  );
};
