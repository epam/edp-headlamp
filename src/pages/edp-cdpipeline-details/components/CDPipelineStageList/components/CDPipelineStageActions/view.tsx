import { DeleteKubeObject } from '../../../../../../components/DeleteKubeObject';
import { EditCDPipelineStage } from '../../../../../../components/EditCDPipelineStage';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { ICONS } from '../../../../../../constants/icons';
import { RESOURCE_ACTIONS } from '../../../../../../constants/resourceActions';
import { Iconify, MuiCore, React } from '../../../../../../plugin.globals';
import { KubeObjectAction } from '../../../../../../types/actions';
import { createKubeAction } from '../../../../../../utils/actions/createKubeAction';
import { CDPipelineStageActionsProps } from './types';
import { createDeleteAction } from './utils';

const { Icon } = Iconify;
const { IconButton } = MuiCore;

export const CDPipelineStageActions = ({
    kubeObject,
    kubeObjectData,
    CDPipelineStages = [],
}: CDPipelineStageActionsProps): React.ReactElement => {
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
                name: RESOURCE_ACTIONS['EDIT'],
                icon: ICONS['PENCIL'],
                action: () => {
                    handleCloseActionsMenu();
                    setEditActionEditorOpen(true);
                },
            }),
            createDeleteAction(CDPipelineStages, kubeObjectData, () => {
                handleCloseActionsMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [handleCloseActionsMenu, setEditActionEditorOpen, CDPipelineStages, kubeObjectData]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseActionsMenu}
            actions={actions}
        >
            <div>
                <IconButton aria-label={'Options'} onClick={toggleActionsMenu}>
                    <Icon icon={ICONS['THREE_DOTS']} color={'grey'} width="20" />
                </IconButton>
                <EditCDPipelineStage
                    open={editActionEditorOpen}
                    onClose={() => setEditActionEditorOpen(false)}
                    setOpen={setEditActionEditorOpen}
                    CDPipelineStageData={kubeObjectData}
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
