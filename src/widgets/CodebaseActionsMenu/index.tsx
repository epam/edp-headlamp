import React from 'react';
import { useHistory } from 'react-router-dom';
import { DeleteKubeObject } from '../../components/DeleteKubeObject';
import { KubeObjectActions } from '../../components/KubeObjectActions';
import { Render } from '../../components/Render';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { EditCodebase } from '../EditCodebase';
import { CodebaseCDPipelineConflictError } from './components/CodebaseCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';

export const CodebaseActionsMenu = () => {
    const history = useHistory();

    const { kubeObject, anchorEl, isDetailsPage, handleCloseResourceActionListMenu } =
        useResourceActionListContext();

    const [editActionPopupOpen, setEditActionPopupOpen] = React.useState<boolean>(false);
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        return [
            createKubeAction({
                name: RESOURCE_ACTIONS.EDIT,
                icon: ICONS.PENCIL,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setEditActionPopupOpen(true);
                },
            }),
            createKubeAction({
                name: RESOURCE_ACTIONS.DELETE,
                icon: ICONS.BUCKET,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setDeleteActionPopupOpen(true);
                },
            }),
        ];
    }, [handleCloseResourceActionListMenu]);

    const conflictedCDPipeline = useConflictedCDPipeline(
        kubeObject as EDPCodebaseKubeObjectInterface
    );

    const onBeforeSubmit = React.useCallback(
        async (setErrorTemplate, setLoadingActive) => {
            setLoadingActive(true);
            if (!conflictedCDPipeline) {
                setLoadingActive(false);
                return;
            }

            setErrorTemplate(
                <CodebaseCDPipelineConflictError
                    conflictedCDPipeline={conflictedCDPipeline}
                    codebase={kubeObject as EDPCodebaseKubeObjectInterface}
                />
            );
            setLoadingActive(false);
        },
        [conflictedCDPipeline, kubeObject]
    );

    const onSuccess = React.useCallback(() => {
        if (!isDetailsPage) {
            return;
        }

        history.goBack();
    }, [history, isDetailsPage]);

    const onClose = React.useCallback(
        (_?, reason?: string) => {
            if (reason === 'backdropClick') {
                return;
            }

            setEditActionPopupOpen(false);
        },
        [setEditActionPopupOpen]
    );

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        >
            <Render condition={!!kubeObject}>
                <div>
                    <EditCodebase
                        open={editActionPopupOpen}
                        onClose={onClose}
                        setOpen={setEditActionPopupOpen}
                        codebaseData={kubeObject}
                    />
                    <DeleteKubeObject
                        popupOpen={deleteActionPopupOpen}
                        setPopupOpen={setDeleteActionPopupOpen}
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={kubeObject}
                        objectName={kubeObject?.metadata?.name}
                        description={`Confirm the deletion of the codebase with all its components`}
                        onBeforeSubmit={onBeforeSubmit}
                        onSuccess={onSuccess}
                    />
                </div>
            </Render>
        </KubeObjectActions>
    );
};
