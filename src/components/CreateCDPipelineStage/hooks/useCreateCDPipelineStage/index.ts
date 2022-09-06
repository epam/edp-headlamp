import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { Notistack, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export const useCreateCDPipelineStage = (
    onSuccess: () => void,
    onError: () => void
): {
    createCDPipelineStage: (
        newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
    ) => Promise<EDPCDPipelineStageKubeObjectInterface | undefined>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createCDPipelineStage = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<void> => {
            const {
                metadata: { name },
            } = newCDPipelineStageData;

            try {
                const result = await EDPCDPipelineStageKubeObject.apiEndpoint.post(
                    newCDPipelineStageData
                );
                onSuccess();
                return result; // return statement only for testing purposes
            } catch (err: any) {
                const errorMessage = createErrorMessage(err, name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createCDPipelineStage };
};
