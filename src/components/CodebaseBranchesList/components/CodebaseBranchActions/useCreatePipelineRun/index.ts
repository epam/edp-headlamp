import { createPipelineRunInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { PipelineRun } from '../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { Notistack, React } from '../../../../../plugin.globals';
import { createErrorMessage } from '../../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export interface createPipelineRunInterface {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
        codebaseType: string;
        codebaseFramework: string;
    };
    codebaseBranchName: string;
    gitServerData: {
        gitUser: string;
        gitHost: string;
        sshPort: number;
        nameSshKeySecret: string;
    };
    randomPostfix: string;
}

export const useCreatePipelineRun = (
    onSuccess?: () => void,
    onError?: () => void
): {
    createPipelineRun: ({
        namespace,
        codebaseBranchName,
    }: createPipelineRunInterface) => Promise<PipelineRunKubeObjectInterface>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createPipelineRun = React.useCallback(
        async ({
            namespace,
            codebaseBranchName,
            codebaseData,
            gitServerData,
            randomPostfix,
        }: createPipelineRunInterface): Promise<PipelineRunKubeObjectInterface> => {
            let newPipelineRunData: PipelineRunKubeObjectInterface;

            try {
                newPipelineRunData = createPipelineRunInstance({
                    namespace,
                    codebaseBranchName,
                    codebaseData,
                    gitServerData,
                    randomPostfix,
                });

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
                    `${codebaseData.codebaseName}-build-${randomPostfix}`
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

    return { createPipelineRun };
};
