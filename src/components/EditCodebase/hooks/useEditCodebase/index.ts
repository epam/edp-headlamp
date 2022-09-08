import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { Notistack, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export const useEditCodebase = (
    onSuccess: () => void,
    onError: () => void
): {
    editCodebase: (
        newCodebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>
    ) => Promise<EDPCodebaseKubeObjectInterface | undefined>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const editCodebase = React.useCallback(
        async (
            newCodebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> => {
            const {
                metadata: { name },
            } = newCodebaseData;

            try {
                const result = await EDPCodebaseKubeObject.apiEndpoint.put(newCodebaseData);
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

    return { editCodebase };
};
