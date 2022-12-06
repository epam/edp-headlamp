import { ICONS } from '../../constants/icons';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
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
    isDetailsPage = false,
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
                name: RESOURCE_ACTIONS['EDIT'],
                icon: ICONS['PENCIL'],
                action: () => {
                    handleCloseActionsMenu();
                    setEditActionPopupOpen(true);
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

    const onSuccess = React.useCallback(() => {
        if (!isDetailsPage) {
            return;
        }

        if (!window.navigation || !window.navigation.canGoBack) {
            return;
        }

        window.navigation.back();
    }, [isDetailsPage]);

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
                    description={`Confirm the deletion of the codebase with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onBeforeSubmit={onBeforeSubmit}
                    onSuccess={onSuccess}
                />
            </div>
        </KubeObjectActions>
    );
};
