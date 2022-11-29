import { DeleteKubeObject } from '../../../../../../components/DeleteKubeObject';
import { EditCDPipelineStage } from '../../../../../../components/EditCDPipelineStage';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { ICONS } from '../../../../../../constants/icons';
import { RESOURCE_ACTIONS } from '../../../../../../constants/resourceActions';
import { EDPCDPipelineStageKubeObject } from '../../../../../../k8s/EDPCDPipelineStage';
import { Iconify, MuiCore, React } from '../../../../../../plugin.globals';
import { KubeObjectAction } from '../../../../../../types/actions';
import { createKubeAction } from '../../../../../../utils/actions/createKubeAction';
import { CDPipelineStagesDataContext, CurrentCDPipelineStageDataContext } from '../../view';
import { createDeleteAction } from './utils';

const { Icon } = Iconify;
const { IconButton } = MuiCore;

export const CDPipelineStageActions = (): React.ReactElement => {
    const CurrentCDPipelineStageDataContextValue = React.useContext(
        CurrentCDPipelineStageDataContext
    );
    const CDPipelineStagesDataContextValue = React.useContext(CDPipelineStagesDataContext);

    const {
        spec: { name },
    } = CurrentCDPipelineStageDataContextValue;

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
            createDeleteAction(
                CDPipelineStagesDataContextValue,
                CurrentCDPipelineStageDataContextValue,
                () => {
                    handleCloseActionsMenu();
                    setDeleteActionPopupOpen(true);
                }
            ),
        ];
    }, [
        handleCloseActionsMenu,
        setEditActionEditorOpen,
        CDPipelineStagesDataContextValue,
        CurrentCDPipelineStageDataContextValue,
    ]);

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
                    CDPipelineStageData={CurrentCDPipelineStageDataContextValue}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={EDPCDPipelineStageKubeObject}
                    kubeObjectData={CurrentCDPipelineStageDataContextValue}
                    objectName={name}
                    description={`Confirm the deletion of the CD stage with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                />
            </div>
        </KubeObjectActions>
    );
};
