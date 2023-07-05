import React from 'react';
import { ICONS } from '../../constants/icons';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObject } from '../DeleteKubeObject';
import { EditCDPipelineStage } from '../EditCDPipelineStage';
import { KubeObjectActions } from '../KubeObjectActions';
import { createDeleteAction } from './utils';

export const StageActionsMenu = ({ stages }) => {
    const { anchorEl, kubeObject, handleCloseResourceActionListMenu } =
        useResourceActionListContext();

    const [editActionEditorOpen, setEditActionEditorOpen] = React.useState<boolean>(false);
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        if (!stages || !kubeObject) {
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
            createDeleteAction(stages, kubeObject as EDPCDPipelineStageKubeObjectInterface, () => {
                handleCloseResourceActionListMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [stages, kubeObject, handleCloseResourceActionListMenu]);

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
                    CDPipelineStageData={kubeObject as EDPCDPipelineStageKubeObjectInterface}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={EDPCDPipelineStageKubeObject}
                    kubeObjectData={kubeObject}
                    objectName={kubeObject?.spec.name}
                    description={`Confirm the deletion of the CD stage with all its components`}
                />
            </div>
        </KubeObjectActions>
    );
};
