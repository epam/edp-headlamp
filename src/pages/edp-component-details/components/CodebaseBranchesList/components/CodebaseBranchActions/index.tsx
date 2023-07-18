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
    const { anchorEl, data, handleCloseResourceActionListMenu } =
        useResourceActionListContext<EDPCodebaseBranchKubeObjectInterface>();
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        if (!data) {
            return;
        }

        return [
            createDeleteAction(data, defaultBranch, () => {
                handleCloseResourceActionListMenu();
                setDeleteActionPopupOpen(true);
            }),
        ].filter(Boolean);
    }, [defaultBranch, handleCloseResourceActionListMenu, data]);

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

    return (
        <>
            <KubeObjectActions
                anchorEl={anchorEl}
                handleCloseActionsMenu={handleCloseResourceActionListMenu}
                actions={actions}
            >
                <Render condition={!!data}>
                    <div>
                        <DeleteKubeObject
                            popupOpen={deleteActionPopupOpen}
                            setPopupOpen={setDeleteActionPopupOpen}
                            kubeObject={EDPCodebaseBranchKubeObject}
                            kubeObjectData={data}
                            objectName={data?.spec.branchName}
                            description={`Confirm the deletion of the codebase branch with all its components`}
                            onBeforeSubmit={onBeforeSubmit}
                        />
                    </div>
                </Render>
            </KubeObjectActions>
        </>
    );
};
