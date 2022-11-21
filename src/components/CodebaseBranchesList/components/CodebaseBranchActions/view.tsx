import { ICONS } from '../../../../constants/icons';
import { RESOURCE_ACTIONS } from '../../../../constants/resourceActions';
import { useGitServers } from '../../../../hooks/useGitServers';
import { useRequest } from '../../../../hooks/useRequest';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { KubeObjectAction } from '../../../../types/actions';
import { createKubeAction } from '../../../../utils/actions/createKubeAction';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { DeleteKubeObject } from '../../../DeleteKubeObject';
import { EditKubeObject } from '../../../EditKubeObject';
import { KubeObjectActions } from '../../../KubeObjectActions';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { CodebaseBranchActionsProps } from './types';
import { createPipelineRunInterface, useCreatePipelineRun } from './useCreatePipelineRun';
import { createDeleteAction, getConflictedCDPipeline } from './utils';

const { IconButton } = MuiCore;
const { Icon } = Iconify;

const randomPostfix = createRandomFiveSymbolString();

export const CodebaseBranchActions = ({
    codebaseBranchData,
    defaultBranch,
    codebase,
}: CodebaseBranchActionsProps): React.ReactElement => {
    const {
        metadata: { namespace },
        spec: { branchName },
    } = codebaseBranchData;
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

    const { gitServers } = useGitServers({ namespace });

    const [gitServerByCodebase] = gitServers.filter(
        el => el.metadata.name === codebase.spec.gitServer
    );

    const { createPipelineRun } = useCreatePipelineRun();

    const applyFunc = React.useCallback(
        async (data: createPipelineRunInterface): Promise<PipelineRunKubeObjectInterface> =>
            createPipelineRun(data),
        [createPipelineRun]
    );

    const { fireRequest } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'create',
        },
    });

    const handleApply = React.useCallback(
        async (data: createPipelineRunInterface): Promise<void> => {
            const name = `${data.codebaseData.codebaseName}-build-${randomPostfix}`;

            await fireRequest({
                objectName: name,
                args: [data],
            });
        },
        [fireRequest]
    );

    const actions: KubeObjectAction[] = React.useMemo(() => {
        return [
            createKubeAction({
                name: 'Build',
                icon: ICONS['PLAY'],
                action: async () => {
                    handleCloseActionsMenu();
                    await handleApply({
                        namespace,
                        codebaseBranchName: branchName,
                        codebaseData: {
                            codebaseName: codebase.metadata.name,
                            codebaseBuildTool: codebase.spec.buildTool,
                            codebaseVersioningType: codebase.spec.versioning.type,
                            codebaseType: codebase.spec.type,
                            codebaseFramework: codebase.spec.framework,
                        },
                        gitServerData: {
                            gitUser: gitServerByCodebase.spec.gitUser,
                            gitHost: gitServerByCodebase.spec.gitHost,
                            sshPort: gitServerByCodebase.spec.sshPort,
                            nameSshKeySecret: gitServerByCodebase.spec.nameSshKeySecret,
                        },
                        randomPostfix,
                    });
                },
            }),
            createKubeAction({
                name: RESOURCE_ACTIONS['EDIT'],
                icon: ICONS['PENCIL'],
                action: () => {
                    handleCloseActionsMenu();
                    setEditActionEditorOpen(true);
                },
            }),
            createDeleteAction(codebaseBranchData, defaultBranch, () => {
                handleCloseActionsMenu();
                setDeleteActionPopupOpen(true);
            }),
        ];
    }, [
        codebaseBranchData,
        defaultBranch,
        handleApply,
        namespace,
        branchName,
        codebase,
        gitServerByCodebase,
        handleCloseActionsMenu,
    ]);

    const onBeforeSubmit = React.useCallback(
        async (handleError, setLoadingActive) => {
            setLoadingActive(true);
            const conflictedCDPipeline = await getConflictedCDPipeline(
                namespace,
                codebaseBranchData,
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
        [branchName, codebase, codebaseBranchData, namespace]
    );

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
                <EditKubeObject
                    editorOpen={editActionEditorOpen}
                    setEditorOpen={setEditActionEditorOpen}
                    kubeObject={EDPCodebaseBranchKubeObject}
                    kubeObjectData={codebaseBranchData}
                />
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={EDPCodebaseBranchKubeObject}
                    kubeObjectData={codebaseBranchData}
                    objectName={branchName}
                    description={`Please confirm the deletion of the codebase branch with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onBeforeSubmit={onBeforeSubmit}
                />
            </div>
        </KubeObjectActions>
    );
};
