import React from 'react';
import { DeleteKubeObject } from '../../../../../../components/DeleteKubeObject';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { Render } from '../../../../../../components/Render';
import { EDPCodebaseBranchKubeObject } from '../../../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../../../../../types/actions';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { CodebaseBranchActionsProps } from './types';
import { createDeleteAction } from './utils';

export const CodebaseBranchActions = ({ defaultBranch, codebase }: CodebaseBranchActionsProps) => {
    const { anchorEl, kubeObject, handleCloseResourceActionListMenu } =
        useResourceActionListContext();
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        if (!kubeObject) {
            return;
        }

        return [
            createDeleteAction(
                kubeObject as EDPCodebaseBranchKubeObjectInterface,
                defaultBranch,
                () => {
                    handleCloseResourceActionListMenu();
                    setDeleteActionPopupOpen(true);
                }
            ),
        ].filter(Boolean);
    }, [defaultBranch, handleCloseResourceActionListMenu, kubeObject]);

    const conflictedCDPipeline = useConflictedCDPipeline(
        kubeObject as EDPCodebaseBranchKubeObjectInterface,
        codebase
    );

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
                    name={kubeObject?.spec.branchName}
                />
            );
            setLoadingActive(false);
        },
        [conflictedCDPipeline, kubeObject?.spec.branchName]
    );

    return (
        <>
            <KubeObjectActions
                anchorEl={anchorEl}
                handleCloseActionsMenu={handleCloseResourceActionListMenu}
                actions={actions}
            >
                <Render condition={!!kubeObject}>
                    <div>
                        <DeleteKubeObject
                            popupOpen={deleteActionPopupOpen}
                            setPopupOpen={setDeleteActionPopupOpen}
                            kubeObject={EDPCodebaseBranchKubeObject}
                            kubeObjectData={kubeObject}
                            objectName={kubeObject?.spec.branchName}
                            description={`Confirm the deletion of the codebase branch with all its components`}
                            onBeforeSubmit={onBeforeSubmit}
                        />
                    </div>
                </Render>
            </KubeObjectActions>
        </>
    );
};
