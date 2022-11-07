import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { Notistack, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

const requestIsFailed = (reqRes: DeepPartial<EDPKubeObjectInterface>) =>
    Object.hasOwn(reqRes, 'status') && reqRes.status !== 'Success';

const deleteCreatedStagesAndCDPipeline = async (
    createdStages: {
        name: string;
        namespace: string;
    }[],
    createdCDPipeline: DeepPartial<EDPCDPipelineKubeObjectInterface>
) => {
    for await (const stage of createdStages) {
        await EDPCDPipelineStageKubeObject.apiEndpoint.delete(stage.namespace, stage.name);
    }

    await EDPCDPipelineKubeObject.apiEndpoint.delete(
        createdCDPipeline.metadata.namespace,
        createdCDPipeline.metadata.name
    );
};

export const useCreateCDPipeline = (
    onSuccess: () => void,
    onError: () => void
): {
    createCDPipeline: (
        newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
        stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>[]
    ) => Promise<DeepPartial<EDPCDPipelineKubeObjectInterface> | undefined>;
    error: Error;
} => {
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = React.useState<Error>(null);

    const createCDPipeline = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
            stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>[]
        ): Promise<DeepPartial<EDPCDPipelineKubeObjectInterface> | undefined> => {
            let createdCDPipeline: DeepPartial<EDPCDPipelineKubeObjectInterface>;

            const createdStages: {
                name: string;
                namespace: string;
            }[] = [];

            let allStagesCreatedSuccessfully: boolean = true;

            const {
                metadata: { name },
            } = newCDPipelineData;

            try {
                createdCDPipeline = await EDPCDPipelineKubeObject.apiEndpoint.post(
                    newCDPipelineData
                );

                for await (const stage of stages) {
                    const stagePostRequestResult =
                        await EDPCDPipelineStageKubeObject.apiEndpoint.post(stage);

                    if (requestIsFailed(stagePostRequestResult)) {
                        allStagesCreatedSuccessfully = false;
                        break;
                    }

                    createdStages.push({
                        name: stagePostRequestResult.metadata.name,
                        namespace: stagePostRequestResult.metadata.namespace,
                    });
                }

                if (allStagesCreatedSuccessfully) {
                    onSuccess();
                    return createdCDPipeline; // return statement only for testing purposes
                }

                setError(new Error(`Stages weren't created!`));

                await deleteCreatedStagesAndCDPipeline(createdStages, createdCDPipeline);
            } catch (err: any) {
                if (createdCDPipeline && createdStages) {
                    await deleteCreatedStagesAndCDPipeline(createdStages, createdCDPipeline);
                }
                const errorMessage = createErrorMessage(err, name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                setError(err);
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createCDPipeline, error };
};
