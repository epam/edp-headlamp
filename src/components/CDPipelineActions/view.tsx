import { ICONS } from '../../constants/icons';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { Iconify, MuiCore, React, ReactRouter } from '../../plugin.globals';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObject } from '../DeleteKubeObject';
import { EditCDPipeline } from '../EditCDPipeline';
import { KubeObjectActions } from '../KubeObjectActions';
import { CDPipelineActionsProps } from './types';

const { IconButton, Tooltip } = MuiCore;
const { Icon } = Iconify;
const { useHistory } = ReactRouter;

export const CDPipelineActions = ({
    kubeObject,
    kubeObjectData,
    isDetailsPage = false,
}: CDPipelineActionsProps): React.ReactElement => {
    const history = useHistory();
    const {
        metadata: { name },
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
            createKubeAction({
                name: RESOURCE_ACTIONS['DELETE'],
                icon: ICONS['BUCKET'],
                action: () => {
                    handleCloseActionsMenu();
                    setDeleteActionPopupOpen(true);
                },
            }),
        ];
    }, [handleCloseActionsMenu, setEditActionEditorOpen, setDeleteActionPopupOpen]);

    const onSuccess = React.useCallback(() => {
        if (!isDetailsPage) {
            return;
        }

        history.goBack();
    }, [history, isDetailsPage]);

    return (
        <KubeObjectActions
            anchorEl={anchorEl}
            handleCloseActionsMenu={handleCloseActionsMenu}
            actions={actions}
        >
            <>
                <Tooltip title={'Actions'}>
                    <IconButton aria-label={'Options'} onClick={toggleActionsMenu}>
                        <Icon icon={ICONS['THREE_DOTS']} color={'grey'} width="20" />
                    </IconButton>
                </Tooltip>
                <EditCDPipeline
                    CDPipelineData={kubeObjectData}
                    onClose={() => setEditActionEditorOpen(false)}
                    open={editActionEditorOpen}
                    setOpen={setEditActionEditorOpen}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={kubeObject}
                    kubeObjectData={kubeObjectData}
                    objectName={name}
                    description={`Confirm the deletion of the CD Pipeline with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onSuccess={onSuccess}
                />
            </>
        </KubeObjectActions>
    );
};
