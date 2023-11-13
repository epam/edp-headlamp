import { GIT_PROVIDERS } from '../../../../../../../constants/gitProviders';
import { useGitServerCRUD } from '../../../../../../../k8s/EDPGitServer/hooks/useGitServerCRUD';
import { createGitServerInstance } from '../../../../../../../k8s/EDPGitServer/utils/createGitServerInstance';
import {
    createGerritGitServerSecretInstance,
    createGithubGitServerSecretInstance,
    createGitlabGitServerSecretInstance,
} from '../../../../../../../k8s/Secret/utils/createGitServerSecretInstance';
import { EDPKubeObjectInterface } from '../../../../../../../types/k8s';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';
import { ManageGitServerValues } from '../../../../../types';

export const useSetupGitServer = ({ onSuccess }) => {
    const {
        createGitServer,
        mutations: {
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
        },
    } = useGitServerCRUD({
        onSuccess,
    });

    const isLoading =
        gitServerCreateMutation.isLoading ||
        gitServerSecretCreateMutation.isLoading ||
        gitServerSecretDeleteMutation.isLoading;

    const setupGitServer = async (formValues: ManageGitServerValues) => {
        const { gitProvider } = formValues;
        const transformedValues = {
            ...formValues,
            sshPort: Number(formValues.sshPort),
            httpsPort: Number(formValues.httpsPort),
        };
        const usedValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);
        const gitServerData = createGitServerInstance(GIT_SERVER_FORM_NAMES, usedValues);

        const setupGerrit = async () => {
            const { sshPrivateKey, sshPublicKey, gitUser } = formValues;

            const gitServerSecretData = createGerritGitServerSecretInstance({
                sshPrivateKey,
                sshPublicKey,
                username: gitUser,
            });

            await createGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });

            if (onSuccess) {
                await onSuccess();
            }
        };

        const setupGithub = async () => {
            const { sshPrivateKey, token, gitUser } = formValues;

            const gitServerSecretData = createGithubGitServerSecretInstance({
                sshPrivateKey,
                token,
                username: gitUser,
            });

            await createGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });

            if (onSuccess) {
                await onSuccess();
            }
        };

        const setupGitlab = async () => {
            const { sshPrivateKey, token } = formValues;

            const gitServerSecretData = createGitlabGitServerSecretInstance({
                sshPrivateKey,
                token,
            });

            await createGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });

            if (onSuccess) {
                await onSuccess();
            }
        };

        switch (gitProvider) {
            case GIT_PROVIDERS.GERRIT:
                await setupGerrit();
                break;
            case GIT_PROVIDERS.GITHUB:
                await setupGithub();
                break;
            case GIT_PROVIDERS.GITLAB:
                await setupGitlab();
                break;
            default:
                break;
        }
    };

    return { setupGitServer, isLoading };
};
