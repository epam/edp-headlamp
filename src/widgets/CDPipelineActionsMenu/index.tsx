import React from 'react';
import { KubeObjectActions } from '../../components/KubeObjectActions';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../CreateEditCDPipeline/constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../CreateEditCDPipeline/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../DeleteKubeObject/types';
import { CDPipelineActionsMenuProps } from './types';

export const CDPipelineActionsMenu = ({ backRoute }: CDPipelineActionsMenuProps) => {
    const { setDialog } = useDialogContext();

    const { data, anchorEl, handleCloseResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineKubeObjectInterface>();

    const actions: KubeObjectAction[] = React.useMemo(() => {
        const createEditCDPipelineDialogForwardedProps: CreateEditCDPipelineDialogForwardedProps = {
            CDPipelineData: data,
            mode: FORM_MODES.EDIT,
        };

        const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
            objectName: data?.metadata.name,
            kubeObject: EDPCDPipelineKubeObject,
            kubeObjectData: data,
            description: `Confirm the deletion of the CD Pipeline with all its components`,
            backRoute,
        };

        return [
            createKubeAction({
                name: RESOURCE_ACTIONS.EDIT,
                icon: ICONS.PENCIL,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setDialog({
                        modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
                        forwardedProps: createEditCDPipelineDialogForwardedProps,
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
    }, [data, backRoute, handleCloseResourceActionListMenu, setDialog]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        />
    );
};
