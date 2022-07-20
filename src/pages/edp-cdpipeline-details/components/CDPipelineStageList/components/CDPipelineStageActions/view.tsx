import { DeleteKubeObject } from '../../../../../../components/DeleteKubeObject';
import { EditKubeObject } from '../../../../../../components/EditKubeObject';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { ICON_PENCIL, ICON_THREE_DOTS } from '../../../../../../constants/icons';
import { KUBE_OBJECT_ACTION_EDIT } from '../../../../../../constants/kubeObjectActions';
import { Iconify, MuiCore, React } from '../../../../../../plugin.globals';
import { KubeObjectAction } from '../../../../../../types/actions';
import { createKubeAction } from '../../../../../../utils/actions/createKubeAction';
import { CDPipelineStageActionsProps } from './types';
import { createDeleteAction } from './utils';

const { Icon } = Iconify;
const { IconButton } = MuiCore;

export const CDPipelineStageActions: React.FC<CDPipelineStageActionsProps> = ({
    kubeObject,
    kubeObjectData,
    cdpipelineStages = [],
    onEdit,
}): React.ReactElement => {
    const {
        spec: { name },
    } = kubeObjectData;

    const [editActionEditorOpen, setEditActionEditorOpen] = React.useState<boolean>(false);
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const toggleActionsMenu = React.useCallback(
        event => {
            setAnchorEl(prev => (prev === event.currentTarget ? null : event.currentTarget));
        },
        [setAnchorEl]
    );

    const handleCloseActionsMenu = React.useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        return [
            createKubeAction({
                name: KUBE_OBJECT_ACTION_EDIT,
                icon: ICON_PENCIL,
                action: () => {
                    handleCloseActionsMenu();
                    setEditActionEditorOpen(true);
                },
            }),
            createDeleteAction(cdpipelineStages, kubeObjectData, () => {
                handleCloseActionsMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [handleCloseActionsMenu, setEditActionEditorOpen, cdpipelineStages, kubeObjectData]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseActionsMenu}
            actions={actions}
        >
            <div>
                <IconButton aria-label={'Options'} onClick={toggleActionsMenu}>
                    <Icon icon={ICON_THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
                <EditKubeObject
                    editorOpen={editActionEditorOpen}
                    setEditorOpen={setEditActionEditorOpen}
                    kubeObject={kubeObject}
                    kubeObjectData={kubeObjectData}
                    onEdit={onEdit}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={kubeObject}
                    kubeObjectData={kubeObjectData}
                    objectName={name}
                    description={`Please confirm the deletion of the CD stage with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                />
            </div>
        </KubeObjectActions>
    );
};
