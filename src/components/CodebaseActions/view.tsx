import { ICON_BUCKET, ICON_PENCIL, ICON_THREE_DOTS } from '../../constants/icons';
import {
    KUBE_OBJECT_ACTION_DELETE,
    KUBE_OBJECT_ACTION_EDIT,
} from '../../constants/kubeObjectActions';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { DeleteKubeObject } from '../DeleteKubeObject';
import { EditCodebase } from '../EditCodebase';
import { KubeObjectActions } from '../KubeObjectActions';
import { CodebaseCDPipelineConflictError } from './components/CodebaseCDPipelineConflictError';
import { CodebaseActionsProps } from './types';
import { getConflictedCDPipeline } from './utils';

const { IconButton } = MuiCore;
const { Icon } = Iconify;

export const CodebaseActions = ({
    kubeObject,
    kubeObjectData,
}: CodebaseActionsProps): React.ReactElement => {
    const {
        metadata: { name },
    } = kubeObjectData;

    const [editActionPopupOpen, setEditActionPopupOpen] = React.useState<boolean>(false);
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
                    setEditActionPopupOpen(true);
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
    }, [handleCloseActionsMenu, setEditActionPopupOpen, setDeleteActionPopupOpen]);

    const onBeforeSubmit = React.useCallback(
        async (setErrorTemplate, setLoadingActive) => {
            setLoadingActive(true);
            const conflictedCDPipeline = await getConflictedCDPipeline(kubeObjectData);
            if (!conflictedCDPipeline) {
                setLoadingActive(false);
                return;
            }

            setErrorTemplate(
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
                <EditCodebase
                    open={editActionPopupOpen}
                    onClose={() => setEditActionPopupOpen(false)}
                    setOpen={setEditActionPopupOpen}
                    codebaseData={kubeObjectData}
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
