import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICONS } from '../../constants/icons';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { useResourceActionListContext } from '../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObject } from '../DeleteKubeObject';
import { EditCDPipeline } from '../EditCDPipeline';
import { KubeObjectActions } from '../KubeObjectActions';
import { Render } from '../Render';

export const CDPipelineActionsMenu = () => {
    const history = useHistory();

    const { kubeObject, anchorEl, isDetailsPage, handleCloseResourceActionListMenu } =
        useResourceActionListContext();
    const [editActionEditorOpen, setEditActionEditorOpen] = React.useState<boolean>(false);
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        return [
            createKubeAction({
                name: RESOURCE_ACTIONS.EDIT,
                icon: ICONS.PENCIL,
                action: () => {
                    handleCloseResourceActionListMenu();
                    setEditActionEditorOpen(true);
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
    }, [handleCloseResourceActionListMenu, setEditActionEditorOpen, setDeleteActionPopupOpen]);

    const onSuccess = React.useCallback(() => {
        if (!isDetailsPage) {
            return;
        }

        history.goBack();
    }, [history, isDetailsPage]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        >
            <Render condition={!!kubeObject}>
                <>
                    <EditCDPipeline
                        CDPipelineData={kubeObject as EDPCDPipelineKubeObjectInterface}
                        onClose={() => setEditActionEditorOpen(false)}
                        open={editActionEditorOpen}
                        setOpen={setEditActionEditorOpen}
                    />
                    <DeleteKubeObject
                        popupOpen={deleteActionPopupOpen}
                        setPopupOpen={setDeleteActionPopupOpen}
                        kubeObject={EDPCDPipelineKubeObject}
                        kubeObjectData={kubeObject}
                        objectName={kubeObject?.metadata.name}
                        description={`Confirm the deletion of the CD Pipeline with all its components`}
                        onSuccess={onSuccess}
                    />
                </>
            </Render>
        </KubeObjectActions>
    );
};
