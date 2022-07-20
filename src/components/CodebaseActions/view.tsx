import { ICON_BUCKET, ICON_PENCIL, ICON_THREE_DOTS } from '../../constants/icons';
import {
    KUBE_OBJECT_ACTION_DELETE,
    KUBE_OBJECT_ACTION_EDIT,
} from '../../constants/kubeObjectActions';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObject } from '../DeleteKubeObject';
import { EditKubeObject } from '../EditKubeObject';
import { KubeObjectActions } from '../KubeObjectActions';
import { CodebaseCDPipelineConflictError } from './components/CodebaseCDPipelineConflictError';
import { CodebaseActionsProps } from './types';
import { getConflictedCDPipeline } from './utils';

const { IconButton } = MuiCore;
const { Icon } = Iconify;

export const CodebaseActions: React.FC<CodebaseActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
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
                name: KUBE_OBJECT_ACTION_EDIT,
                icon: ICON_PENCIL,
                action: () => {
                    handleCloseActionsMenu();
                    setEditActionEditorOpen(true);
                },
            }),
            createKubeAction({
                name: KUBE_OBJECT_ACTION_DELETE,
                icon: ICON_BUCKET,
                action: () => {
                    handleCloseActionsMenu();
                    setDeleteActionPopupOpen(true);
                },
            }),
        ];
    }, [handleCloseActionsMenu, setEditActionEditorOpen, setDeleteActionPopupOpen]);

    const onBeforeSubmit = React.useCallback(
        async (handleError, setLoadingActive) => {
            setLoadingActive(true);
            const conflictedCDPipeline = await getConflictedCDPipeline(kubeObjectData);
            if (!conflictedCDPipeline) {
                setLoadingActive(false);
                return;
            }

            handleError(
                <CodebaseCDPipelineConflictError
                    conflictedCDPipeline={conflictedCDPipeline}
                    codebase={kubeObjectData}
                />
            );
            setLoadingActive(false);
        },
        [kubeObjectData]
    );

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
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={kubeObject}
                    kubeObjectData={kubeObjectData}
                    objectName={name}
                    description={`Please confirm the deletion of the codebase with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onBeforeSubmit={onBeforeSubmit}
                />
            </div>
        </KubeObjectActions>
    );
};
