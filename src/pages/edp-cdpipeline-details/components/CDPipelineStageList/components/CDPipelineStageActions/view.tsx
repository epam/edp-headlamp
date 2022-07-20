import { DeleteKubeObject } from '../../../../../../components/DeleteKubeObject';
import { EditKubeObject } from '../../../../../../components/EditKubeObject';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { ICON_BUCKET, ICON_PENCIL, ICON_THREE_DOTS } from '../../../../../../constants/icons';
import {
    KUBE_OBJECT_ACTION_DELETE,
    KUBE_OBJECT_ACTION_EDIT,
} from '../../../../../../constants/kubeObjectActions';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { KubeObjectAction } from '../../../../../../types/actions';
import { createKubeAction } from '../../../../../../utils/actions/createKubeAction';
import { CDPipelineStageActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = globalThis;

const { IconButton } = MuiCore;
const { Icon } = Iconify;

const getStageOrder = (stage: EDPCDPipelineStageKubeObjectInterface): number => stage.spec.order;

const createDeleteAction = (
    allStages: EDPCDPipelineStageKubeObjectInterface[],
    currentStage: EDPCDPipelineStageKubeObjectInterface,
    action: () => void
): KubeObjectAction => {
    // CD pipeline could publish artifacts without any stage
    // so, in case it doesn't have any stage
    // probably this is something wrong and somebody messed-up CR
    if (allStages.length === 0) {
        throw new Error('CD Pipeline should have at least one stage');
    }

    // we don't let user remove last stage
    if (allStages.length === 1) {
        return createKubeAction({
            name: KUBE_OBJECT_ACTION_DELETE,
            disabled: {
                status: true,
                reason: 'CD pipeline should have at least one stage',
            },
            icon: ICON_BUCKET,
        });
    }

    const currentStageOrder = getStageOrder(currentStage);
    const otherStages = allStages.filter(el => el.metadata.name !== currentStage.metadata.name);
    const highestOtherStagesOrder = Math.max(...otherStages.map(getStageOrder));

    if (currentStageOrder > highestOtherStagesOrder) {
        return createKubeAction({
            name: KUBE_OBJECT_ACTION_DELETE,
            icon: ICON_BUCKET,
            action: action,
        });
    }

    return createKubeAction({
        name: KUBE_OBJECT_ACTION_DELETE,
        disabled: {
            status: true,
            reason: 'You are able to delete only the last stage',
        },
        icon: ICON_BUCKET,
    });
};

export const CDPipelineStageActions: React.FC<CDPipelineStageActionsProps> = ({
    kubeObject,
    kubeObjectData,
    cdpipelineStages = [],
    onEdit,
    onDelete,
}): React.ReactElement => {
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
    }, [
        createKubeAction,
        setEditActionEditorOpen,
        createDeleteAction,
        cdpipelineStages,
        kubeObjectData,
    ]);

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
                    description={`Please confirm the deletion of the CD stage with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onDelete={onDelete}
                />
            </div>
        </KubeObjectActions>
    );
};
