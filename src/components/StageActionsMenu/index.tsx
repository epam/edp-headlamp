import React from 'react';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { useDefaultCIToolQuery } from '../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { FORM_MODES } from '../../types/forms';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../widgets/CreateEditStage/types';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../widgets/DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../widgets/DeleteKubeObject/types';
import { KubeObjectActions } from '../KubeObjectActions';
import { createDeleteAction } from './utils';

export const StageActionsMenu = ({ stages }) => {
    const { setDialog } = useDialogContext();

    const { anchorEl, data, handleCloseResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();

    const { data: defaultCITool } = useDefaultCIToolQuery();

    const actions: KubeObjectAction[] = React.useMemo(() => {
        const createEditStageDialogForwardedProps: CreateEditStageDialogForwardedProps = {
            stage: data,
            mode: FORM_MODES.EDIT,
            otherStages: stages,
            ciTool: defaultCITool,
        };

        const deleteKubeObjectDialogForwardedProps: DeleteKubeObjectDialogForwardedProps = {
            objectName: data?.spec?.name,
            kubeObject: EDPCDPipelineStageKubeObject,
            kubeObjectData: data,
            description: `Confirm the deletion of the CD stage with all its components`,
        };

        if (!stages || !data) {
            return;
        }

        return [
            createKubeAction({
                name: RESOURCE_ACTIONS.EDIT,
                icon: ICONS.PENCIL,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setDialog({
                        modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
                        forwardedProps: createEditStageDialogForwardedProps,
                    });
                },
            }),
            createDeleteAction(stages, data, () => {
                handleCloseResourceActionListMenu();
                setDialog({
                    modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
                    forwardedProps: deleteKubeObjectDialogForwardedProps,
                });
            }),
        ];
    }, [data, stages, defaultCITool, handleCloseResourceActionListMenu, setDialog]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        />
    );
};
