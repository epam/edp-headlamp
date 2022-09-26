import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { Notistack, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export const useEditCDPipeline = (
    onSuccess: () => void,
    onError: () => void
): {
    editCDPipeline: (
        newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>
    ) => Promise<EDPCDPipelineKubeObjectInterface | undefined>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const editCDPipeline = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>
        ): Promise<EDPCDPipelineKubeObjectInterface | undefined> => {
            const {
                metadata: { name },
            } = newCDPipelineData;

            try {
                const result = await EDPCDPipelineKubeObject.apiEndpoint.put(newCDPipelineData);
                onSuccess();
                return result;
            } catch (err: any) {
                const errorMessage = createErrorMessage(err, name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { editCDPipeline };
};
