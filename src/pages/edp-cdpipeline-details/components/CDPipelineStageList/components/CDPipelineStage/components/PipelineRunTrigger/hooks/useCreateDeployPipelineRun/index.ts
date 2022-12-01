import { createDeployPipelineRunInstance } from '../../../../../../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { PipelineRun } from '../../../../../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../../../k8s/PipelineRun/types';
import { Notistack, React } from '../../../../../../../../../../plugin.globals';
import { createErrorMessage } from '../../../../../../../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../../../../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export interface createDeployPipelineRunProps {
    namespace: string;
    pipelineName: string;
    stageName: string;
    CDPipelineName: string;
    randomPostfix: string;
    codebaseTag: string;
}

export const useCreateDeployPipelineRun = (
    onSuccess?: () => void,
    onError?: () => void
): {
    createDeployPipelineRun: (
        data: createDeployPipelineRunProps
    ) => Promise<PipelineRunKubeObjectInterface>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createDeployPipelineRun = React.useCallback(
        async (data: createDeployPipelineRunProps): Promise<PipelineRunKubeObjectInterface> => {
            const { CDPipelineName, stageName, randomPostfix } = data;

            let newPipelineRunData: PipelineRunKubeObjectInterface;

            try {
                newPipelineRunData = createDeployPipelineRunInstance(data);

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
                    `${CDPipelineName}-${stageName}-${randomPostfix}`
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

    return { createDeployPipelineRun };
};
