import { CI_TOOLS } from '../../../../constants/ciTools';
import { ICONS } from '../../../../constants/icons';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { useGitServerByCodebaseQuery } from '../../../../k8s/EDPGitServer/hooks/useGitServerByCodebaseQuery';
import { useStorageSizeQuery } from '../../../../k8s/TriggerTemplate/hooks/useStorageSizeQuery';
import { React } from '../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { KubeObjectAction } from '../../../../types/actions';
import { createKubeAction } from '../../../../utils/actions/createKubeAction';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { DeleteKubeObject } from '../../../DeleteKubeObject';
import { KubeObjectActions } from '../../../KubeObjectActions';
import { Render } from '../../../Render';
import { CodebaseBranchCDPipelineConflictError } from './components/CodebaseBranchCDPipelineConflictError';
import { useConflictedCDPipeline } from './hooks/useConflictedCDPipeline';
import { useCreateBuildPipelineRun } from './hooks/useCreateBuildPipelineRun';
import { CodebaseBranchActionsProps } from './types';
import { createDeleteAction } from './utils';

export const CodebaseBranchActions = ({ defaultBranch, codebase }: CodebaseBranchActionsProps) => {
    const { anchorEl, kubeObject, handleCloseResourceActionListMenu } =
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
                        codebaseBranchName: kubeObject?.spec.branchName,
                        codebaseBranchMetadataName: kubeObject?.metadata.name,
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
        kubeObject?.metadata.name,
        kubeObject?.spec.branchName,
        randomPostfix,
        storageSize,
    ]);

    const actions: KubeObjectAction[] = React.useMemo(() => {
        if (!kubeObject) {
            return;
        }

        return [
            buildAction,
            createDeleteAction(
                kubeObject as EDPCodebaseBranchKubeObjectInterface,
                defaultBranch,
                () => {
                    handleCloseResourceActionListMenu();
                    setDeleteActionPopupOpen(true);
                }
            ),
        ].filter(Boolean);
    }, [buildAction, defaultBranch, handleCloseResourceActionListMenu, kubeObject]);

    const conflictedCDPipeline = useConflictedCDPipeline(
        kubeObject as EDPCodebaseBranchKubeObjectInterface,
        codebase
    );

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
                    name={kubeObject?.spec.branchName}
                />
            );
            setLoadingActive(false);
        },
        [conflictedCDPipeline, kubeObject?.spec.branchName]
    );

    return (
        <>
            <KubeObjectActions
                anchorEl={anchorEl}
                handleCloseActionsMenu={handleCloseResourceActionListMenu}
                actions={actions}
            >
                <Render condition={!!kubeObject}>
                    <div>
                        <DeleteKubeObject
                            popupOpen={deleteActionPopupOpen}
                            setPopupOpen={setDeleteActionPopupOpen}
                            kubeObject={EDPCodebaseBranchKubeObject}
                            kubeObjectData={kubeObject}
                            objectName={kubeObject?.spec.branchName}
                            description={`Confirm the deletion of the codebase branch with all its components`}
                            onBeforeSubmit={onBeforeSubmit}
                        />
                    </div>
                </Render>
            </KubeObjectActions>
        </>
    );
};
