import React from 'react';
import { useHistory } from 'react-router-dom';
import { KubeObjectActions } from '../../components/KubeObjectActions';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../CreateEditCodebase/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { CodebaseCDPipelineConflictError } from './components/CodebaseCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';

export const CodebaseActionsMenu = () => {
    const history = useHistory();
    const { setDialog } = useDialogContext();

    const { data, anchorEl, isDetailsPage, handleCloseResourceActionListMenu } =
        useResourceActionListContext<EDPCodebaseKubeObjectInterface>();

    const conflictedCDPipeline = useConflictedCDPipeline(data);

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
                    codebase={data}
                />
            );
            setLoadingActive(false);
        },
        [conflictedCDPipeline, data]
    );

    const onSuccess = React.useCallback(() => {
        if (!isDetailsPage) {
            return;
        }

        history.goBack();
    }, [history, isDetailsPage]);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        const createEditCodebaseDialogForwardedProps: CreateEditCodebaseDialogForwardedProps = {
            codebaseData: data,
            mode: FORM_MODES.EDIT,
        };

        const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
            objectName: data?.metadata?.name,
            kubeObject: EDPCodebaseKubeObject,
            kubeObjectData: data,
            description: `Confirm the deletion of the codebase with all its components`,
            onBeforeSubmit,
            onSuccess,
        };

        return [
            createKubeAction({
                name: RESOURCE_ACTIONS.EDIT,
                icon: ICONS.PENCIL,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setDialog({
                        modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
                        forwardedProps: createEditCodebaseDialogForwardedProps,
                    });
                },
            }),
            createKubeAction({
                name: RESOURCE_ACTIONS.DELETE,
                icon: ICONS.BUCKET,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setDialog({
                        modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
                        forwardedProps: deleteKubeObjectDialogForwardedProps,
                    });
                },
            }),
        ];
    }, [data, handleCloseResourceActionListMenu, onBeforeSubmit, onSuccess, setDialog]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        />
    );
};
