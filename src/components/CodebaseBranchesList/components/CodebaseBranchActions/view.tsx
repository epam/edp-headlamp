import { ICON_PENCIL, ICON_THREE_DOTS } from '../../../../constants/icons';
import { KUBE_OBJECT_ACTION_EDIT } from '../../../../constants/kubeObjectActions';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { KubeObjectAction } from '../../../../types/actions';
import { createKubeAction } from '../../../../utils/actions/createKubeAction';
import { DeleteKubeObject } from '../../../DeleteKubeObject';
import { EditKubeObject } from '../../../EditKubeObject';
import { KubeObjectActions } from '../../../KubeObjectActions';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { CodebaseBranchActionsProps } from './types';
import { createDeleteAction, getConflictedCDPipeline } from './utils';

const { IconButton } = MuiCore;
const { Icon } = Iconify;

export const CodebaseBranchActions: React.FC<CodebaseBranchActionsProps> = ({
    kubeObject,
    kubeObjectData,
    defaultBranch,
    codebase,
}): React.ReactElement => {
    const {
        metadata: { namespace },
        spec: { branchName },
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
            createDeleteAction(kubeObjectData, defaultBranch, () => {
                handleCloseActionsMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [
        defaultBranch,
        handleCloseActionsMenu,
        setEditActionEditorOpen,
        setDeleteActionPopupOpen,
        kubeObjectData,
    ]);

    const onBeforeSubmit = React.useCallback(
        async (handleError, setLoadingActive) => {
            setLoadingActive(true);
            const conflictedCDPipeline = await getConflictedCDPipeline(
                namespace,
                kubeObjectData,
                codebase
            );
            if (!conflictedCDPipeline) {
                setLoadingActive(false);
                return;
            }

            handleError(
                <CodebaseBranchCDPipelineConflictError
                    conflictedCDPipeline={conflictedCDPipeline}
                    name={branchName}
                />
            );
            setLoadingActive(false);
        },
        [branchName, codebase, kubeObjectData, namespace]
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
                    objectName={branchName}
                    description={`Please confirm the deletion of the codebase branch with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onBeforeSubmit={onBeforeSubmit}
                />
            </div>
        </KubeObjectActions>
    );
};
