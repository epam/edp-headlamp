import React from 'react';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { EditCDPipelineStage } from '../../widgets/EditCDPipelineStage';
import { DeleteKubeObject } from '../DeleteKubeObject';
import { KubeObjectActions } from '../KubeObjectActions';
import { createDeleteAction } from './utils';

export const StageActionsMenu = ({ stages }) => {
    const { anchorEl, data, handleCloseResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();

    const [editActionEditorOpen, setEditActionEditorOpen] = React.useState<boolean>(false);
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        if (!stages || !data) {
            return;
        }

        return [
            createKubeAction({
                name: RESOURCE_ACTIONS.EDIT,
                icon: ICONS.PENCIL,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setEditActionEditorOpen(true);
                },
            }),
            createDeleteAction(stages, data, () => {
                handleCloseResourceActionListMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [stages, data, handleCloseResourceActionListMenu]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        >
            <div>
                <EditCDPipelineStage
                    open={editActionEditorOpen}
                    onClose={() => setEditActionEditorOpen(false)}
                    setOpen={setEditActionEditorOpen}
                    CDPipelineStageData={data}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={EDPCDPipelineStageKubeObject}
                    kubeObjectData={data}
                    objectName={data?.spec.name}
                    description={`Confirm the deletion of the CD stage with all its components`}
                />
            </div>
        </KubeObjectActions>
    );
};
