import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { Notistack, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export const useCreateCodebaseBranch = (
    onSuccess,
    onError
): {
    createCodebaseBranch: (
        newCodebaseBranchData: DeepPartial<EDPCodebaseBranchKubeObjectInterface>
    ) => Promise<EDPCodebaseBranchKubeObjectInterface | undefined>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createCodebaseBranch = React.useCallback(
        async (newCodebaseBranchData: DeepPartial<EDPCodebaseBranchKubeObjectInterface>) => {
            try {
                const result = await EDPCodebaseBranchKubeObject.apiEndpoint.post(
                    newCodebaseBranchData
                );
                onSuccess();
                return result; // return statement only for testing purposes
            } catch (err) {
                const errorMessage = createErrorMessage(err, newCodebaseBranchData.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createCodebaseBranch };
};
