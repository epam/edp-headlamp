import { createBuildPipelineRunInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { PipelineRun } from '../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { Notistack, React } from '../../../../../plugin.globals';
import { createErrorMessage } from '../../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export interface createBuildPipelineRunProps {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseType: string;
        codebaseLanguage: string;
        codebaseFramework: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
        codebaseStrategy: string;
        codebaseGitUrlPath: string;
    };
    codebaseBranchData: {
        codebaseBranchMetadataName: string;
        codebaseBranchName: string;
    };
    gitServerData: {
        gitUser: string;
        gitHost: string;
        gitProvider: string;
        sshPort: number;
        nameSshKeySecret: string;
    };
    randomPostfix: string;
}

export const useCreateBuildPipelineRun = (
    onSuccess?: () => void,
    onError?: () => void
): {
    createBuildPipelineRun: (
        data: createBuildPipelineRunProps
    ) => Promise<PipelineRunKubeObjectInterface>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createBuildPipelineRun = React.useCallback(
        async (data: createBuildPipelineRunProps): Promise<PipelineRunKubeObjectInterface> => {
            const { codebaseData, codebaseBranchData, randomPostfix } = data;
            let newPipelineRunData: PipelineRunKubeObjectInterface;

            try {
                newPipelineRunData = createBuildPipelineRunInstance(data);

                const pipelineRunPostRequestResult = await PipelineRun.apiEndpoint.post(
                    newPipelineRunData
                );

                if (onSuccess) {
                    onSuccess();
                }
                return pipelineRunPostRequestResult;
            } catch (err) {
                const errorMessage = createErrorMessage(
                    err,
                    `${codebaseData.codebaseName}-${codebaseBranchData.codebaseBranchName}-build-${randomPostfix}`
                );

                throwErrorNoty(enqueueSnackbar, errorMessage);

                if (onError) {
                    onError();
                }

                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createBuildPipelineRun };
};
