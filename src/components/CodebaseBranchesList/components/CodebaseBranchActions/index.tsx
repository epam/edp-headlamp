import { CI_TOOLS } from '../../../../constants/ciTools';
import { ICONS } from '../../../../constants/icons';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { KubeObjectAction } from '../../../../types/actions';
import { createKubeAction } from '../../../../utils/actions/createKubeAction';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { DeleteKubeObject } from '../../../DeleteKubeObject';
import { KubeObjectActions } from '../../../KubeObjectActions';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { CodebaseBranchActionsProps } from './types';
import { useCreateBuildPipelineRun } from './useCreateBuildPipelineRun';
import { createDeleteAction, getConflictedCDPipeline } from './utils';

const { IconButton } = MuiCore;
const { Icon } = Iconify;

export const CodebaseBranchActions = ({
    codebaseBranchData,
    defaultBranch,
    codebase,
    gitServers,
    triggerTemplates,
}: CodebaseBranchActionsProps): React.ReactElement => {
    const {
        spec: { ciTool },
    } = codebase;
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

    const gitServerByCodebase = gitServers
        ? gitServers.filter(el => el.metadata.name === codebase.spec.gitServer)?.[0]
        : null;

    console.log(gitServerByCodebase);

    const { createBuildPipelineRun } = useCreateBuildPipelineRun({});

    const storageSize = React.useMemo(() => {
        if (!triggerTemplates?.length) {
            return;
        }

        const buildTriggerTemplate = triggerTemplates.find(
            el => el.metadata.name === `${codebase.spec.gitServer}-build-template`
        );

        return buildTriggerTemplate?.spec?.resourcetemplates?.[0]?.spec?.workspaces?.[0]
            ?.volumeClaimTemplate?.spec?.resources?.requests?.storage;
    }, [codebase.spec.gitServer, triggerTemplates]);

    const randomPostfix = createRandomFiveSymbolString();

    const buildAction = React.useMemo(() => {
        if (ciTool === CI_TOOLS['JENKINS']) {
            return null;
        }

        return createKubeAction({
            name: 'Build',
            icon: ICONS['PLAY'],
            action: async () => {
                handleCloseActionsMenu();

                if (!storageSize) {
                    throw new Error(`Trigger template's storage property has not been found`);
                }

                if (!gitServerByCodebase) {
                    throw new Error(`Codebase Git Server has not been found`);
                }

                await createBuildPipelineRun({
                    namespace: codebase.metadata.namespace,
                    codebaseBranchData: {
                        codebaseBranchName: codebaseBranchData.spec.branchName,
                        codebaseBranchMetadataName: codebaseBranchData.metadata.name,
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
        codebase,
        codebaseBranchData,
        createBuildPipelineRun,
        gitServerByCodebase,
        handleCloseActionsMenu,
        randomPostfix,
        storageSize,
    ]);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        return [
            buildAction,
            createDeleteAction(codebaseBranchData, defaultBranch, () => {
                handleCloseActionsMenu();
                setDeleteActionPopupOpen(true);
            }),
        ].filter(Boolean);
    }, [buildAction, codebaseBranchData, defaultBranch, handleCloseActionsMenu]);

    const onBeforeSubmit = React.useCallback(
        async (handleError, setLoadingActive) => {
            setLoadingActive(true);
            const conflictedCDPipeline = await getConflictedCDPipeline(
                codebase.metadata.namespace,
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
                    name={codebaseBranchData.spec.branchName}
                />
            );
            setLoadingActive(false);
        },
        [codebase, codebaseBranchData]
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
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={EDPCodebaseBranchKubeObject}
                    kubeObjectData={codebaseBranchData}
                    objectName={codebaseBranchData.spec.branchName}
                    description={`Confirm the deletion of the codebase branch with all its components
                            (Record in database, Jenkins pipeline, cluster namespace).`}
                    onBeforeSubmit={onBeforeSubmit}
                />
            </div>
        </KubeObjectActions>
    );
};
