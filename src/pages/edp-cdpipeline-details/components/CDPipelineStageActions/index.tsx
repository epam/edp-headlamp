import { DeleteKubeObject } from '../../../../components/DeleteKubeObject';
import { EditCDPipelineStage } from '../../../../components/EditCDPipelineStage';
import { KubeObjectActions } from '../../../../components/KubeObjectActions';
import { ICONS } from '../../../../constants/icons';
import { RESOURCE_ACTIONS } from '../../../../constants/resourceActions';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../../../types/actions';
import { createKubeAction } from '../../../../utils/actions/createKubeAction';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { useCDPipelineStagesContext } from '../../providers/CDPipelineStages/hooks';
import { createDeleteAction } from './utils';

const { Icon } = Iconify;
const { IconButton, Tooltip } = MuiCore;

export const CDPipelineStageActions = (): React.ReactElement => {
    const { stage } = useCDPipelineStageContext();
    const { stages } = useCDPipelineStagesContext();

    const { anchorEl, handleOpenResourceActionListMenu, handleCloseResourceActionListMenu } =
        useResourceActionListContext();
    const {
        spec: { name },
    } = stage;

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
            createDeleteAction(stages, stage, () => {
                handleCloseResourceActionListMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [stages, stage, handleCloseResourceActionListMenu]);

    const buttonRef = React.createRef<HTMLButtonElement>();

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseResourceActionListMenu}
            actions={actions}
        >
            <div>
                <Tooltip title={'Actions'}>
                    <IconButton
                        aria-label={'Actions'}
                        ref={buttonRef}
                        onClick={() => handleOpenResourceActionListMenu(buttonRef.current, stage)}
                    >
                        <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                    </IconButton>
                </Tooltip>
                <EditCDPipelineStage
                    open={editActionEditorOpen}
                    onClose={() => setEditActionEditorOpen(false)}
                    setOpen={setEditActionEditorOpen}
                    CDPipelineStageData={stage}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={EDPCDPipelineStageKubeObject}
                    kubeObjectData={stage}
                    objectName={name}
                    description={`Confirm the deletion of the CD stage with all its components`}
                />
            </div>
        </KubeObjectActions>
    );
};
