import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { Notistack, pluginLib, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

const {
    K8s: { secret: SecretKubeObject },
} = pluginLib;

const requestIsFailed = (reqRes: DeepPartial<EDPKubeObjectInterface>) =>
    Object.hasOwn(reqRes, 'status') && reqRes.status !== 'Success';

const deleteSecret = async (secretInstance: DeepPartial<EDPKubeObjectInterface>): Promise<void> => {
    await SecretKubeObject.default.apiEndpoint.delete(
        secretInstance.metadata.namespace,
        secretInstance.metadata.name
    );
};

export const useCreateGitServer = (
    onSuccess,
    onError
): {
    createGitServer: (
        gitServerData: DeepPartial<EDPGitServerKubeObjectInterface>,
        gitServerSecretData: DeepPartial<EDPKubeObjectInterface>
    ) => Promise<DeepPartial<EDPGitServerKubeObjectInterface>>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createGitServer = React.useCallback(
        async (
            gitServerData: DeepPartial<EDPGitServerKubeObjectInterface>,
            gitServerSecretData: DeepPartial<EDPKubeObjectInterface>
        ) => {
            let secretCreated: boolean = false;

            try {
                const secretPostRequestResult = await SecretKubeObject.default.apiEndpoint.post(
                    gitServerSecretData
                );
                secretCreated = true;

                if (requestIsFailed(secretPostRequestResult)) {
                    await deleteSecret(secretPostRequestResult);
                    secretCreated = false;
                }

                const gitServerPostRequestResult = await EDPGitServerKubeObject.apiEndpoint.post(
                    gitServerData
                );

                if (requestIsFailed(gitServerPostRequestResult)) {
                    await deleteSecret(secretPostRequestResult);
                    secretCreated = false;
                }

                if (secretCreated && gitServerPostRequestResult) {
                    onSuccess();
                    return gitServerPostRequestResult; // return statement is used only for testing purposes, it's not used anywhere except test
                }
            } catch (err) {
                if (secretCreated) {
                    await deleteSecret(gitServerSecretData);
                }
                const errorMessage = createErrorMessage(err, gitServerData.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createGitServer };
};
