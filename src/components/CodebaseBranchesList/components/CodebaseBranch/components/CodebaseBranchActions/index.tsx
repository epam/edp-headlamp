import { CI_TOOLS } from '../../../../../../constants/ciTools';
import { ICONS } from '../../../../../../constants/icons';
import { EDPCodebaseBranchKubeObject } from '../../../../../../k8s/EDPCodebaseBranch';
import { useGitServerByCodebaseQuery } from '../../../../../../k8s/EDPGitServer/hooks/useGitServerByCodebaseQuery';
import { useStorageSizeQuery } from '../../../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { Iconify, MuiCore, React } from '../../../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../../../../../types/actions';
import { createKubeAction } from '../../../../../../utils/actions/createKubeAction';
import { createRandomFiveSymbolString } from '../../../../../../utils/createRandomFiveSymbolString';
import { DeleteKubeObject } from '../../../../../DeleteKubeObject';
import { KubeObjectActions } from '../../../../../KubeObjectActions';
import { Render } from '../../../../../Render';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { useCreateBuildPipelineRun } from './hooks/useCreateBuildPipelineRun';
import { CodebaseBranchActionsProps } from './types';
import { createDeleteAction } from './utils';

const { Icon } = Iconify;
const { IconButton, Tooltip } = MuiCore;

export const CodebaseBranchActions = ({
    codebaseBranchData,
    defaultBranch,
    codebase,
}: CodebaseBranchActionsProps): React.ReactElement => {
    const { anchorEl, handleOpenResourceActionListMenu, handleCloseResourceActionListMenu } =
        useResourceActionListContext();

    const {
        spec: { ciTool },
    } = codebase;
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);
    const { createBuildPipelineRun } = useCreateBuildPipelineRun({});

    const { data: gitServerByCodebase } = useGitServerByCodebaseQuery({
        props: { codebaseGitServer: codebase?.spec.gitServer },
    });

    const { data: storageSize } = useStorageSizeQuery(codebase);

    const randomPostfix = createRandomFiveSymbolString();

    const buildAction = React.useMemo(() => {
        if (ciTool === CI_TOOLS.JENKINS) {
            return null;
        }

        return createKubeAction({
            name: 'Build',
            icon: ICONS.PLAY,
            action: async () => {
                handleCloseResourceActionListMenu();

                if (!storageSize) {
                    throw new Error(`Trigger template's storage property has not been found`);
                }

                if (!gitServerByCodebase) {
                    throw new Error(`Codebase Git Server has not been found`);
                }

                await createBuildPipelineRun({
                    namespace: codebase.metadata.namespace,
                    codebaseBranchData: {
                        codebaseBranchName: codebaseBranchData?.spec.branchName,
                        codebaseBranchMetadataName: codebaseBranchData?.metadata.name,
                    },
                    codebaseData: {
                        codebaseName: codebase.metadata.name,
                        codebaseBuildTool: codebase.spec.buildTool,
                        codebaseVersioningType: codebase.spec.versioning.type,
                        codebaseType: codebase.spec.type,
                        codebaseFramework: codebase.spec.framework,
                        codebaseGitUrlPath: codebase.spec.gitUrlPath,
                    },
                    gitServerData: {
                        gitUser: gitServerByCodebase.spec.gitUser,
                        gitHost: gitServerByCodebase.spec.gitHost,
                        gitProvider: gitServerByCodebase.spec.gitProvider,
                        sshPort: gitServerByCodebase.spec.sshPort,
                        nameSshKeySecret: gitServerByCodebase.spec.nameSshKeySecret,
                    },
                    storageSize: storageSize,
                    randomPostfix,
                });
            },
        });
    }, [
        ciTool,
        codebase.metadata.name,
        codebase.metadata.namespace,
        codebase.spec.buildTool,
        codebase.spec.framework,
        codebase.spec.gitUrlPath,
        codebase.spec.type,
        codebase.spec.versioning.type,
        createBuildPipelineRun,
        gitServerByCodebase,
        handleCloseResourceActionListMenu,
        codebaseBranchData?.metadata.name,
        codebaseBranchData?.spec.branchName,
        randomPostfix,
        storageSize,
    ]);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        if (!codebaseBranchData) {
            return;
        }

        return [
            buildAction,
            createDeleteAction(codebaseBranchData, defaultBranch, () => {
                handleCloseResourceActionListMenu();
                setDeleteActionPopupOpen(true);
            }),
        ].filter(Boolean);
    }, [buildAction, defaultBranch, handleCloseResourceActionListMenu, codebaseBranchData]);

    const conflictedCDPipeline = useConflictedCDPipeline(codebaseBranchData, codebase);

    const onBeforeSubmit = React.useCallback(
        async (handleError, setLoadingActive) => {
            setLoadingActive(true);
            if (!conflictedCDPipeline) {
                setLoadingActive(false);
                return;
            }

            handleError(
                <CodebaseBranchCDPipelineConflictError
                    conflictedCDPipeline={conflictedCDPipeline}
                    name={codebaseBranchData?.spec.branchName}
                />
            );
            setLoadingActive(false);
        },
        [conflictedCDPipeline, codebaseBranchData?.spec.branchName]
    );

    const buttonRef = React.createRef<HTMLButtonElement>();

    return (
        <>
            <Tooltip title={'Actions'}>
                <IconButton
                    aria-label={'Actions'}
                    ref={buttonRef}
                    onClick={() =>
                        handleOpenResourceActionListMenu(
                            buttonRef.current,
                            codebaseBranchData,
                            true
                        )
                    }
                >
                    <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <KubeObjectActions
                anchorEl={anchorEl}
                handleCloseActionsMenu={handleCloseResourceActionListMenu}
                actions={actions}
            >
                <Render condition={!!codebaseBranchData}>
                    <div>
                        <DeleteKubeObject
                            popupOpen={deleteActionPopupOpen}
                            setPopupOpen={setDeleteActionPopupOpen}
                            kubeObject={EDPCodebaseBranchKubeObject}
                            kubeObjectData={codebaseBranchData}
                            objectName={codebaseBranchData?.spec.branchName}
                            description={`Confirm the deletion of the codebase branch with all its components`}
                            onBeforeSubmit={onBeforeSubmit}
                        />
                    </div>
                </Render>
            </KubeObjectActions>
        </>
    );
};
