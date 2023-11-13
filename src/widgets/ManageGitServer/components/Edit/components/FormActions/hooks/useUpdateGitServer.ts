import { GIT_PROVIDERS } from '../../../../../../../constants/gitProviders';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { useGitServerCRUD } from '../../../../../../../k8s/EDPGitServer/hooks/useGitServerCRUD';
import { useFormContext } from '../../../../../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../../../../../types/k8s';
import { safeEncode } from '../../../../../../../utils/decodeEncode';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../../../types';

export const useUpdateGitServer = ({ onSuccess }) => {
    const {
        formData: { gitServer, gitServerSecret },
    } = useFormContext<ManageGitServerDataContext>();
    const {
        editGitServer,
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

    const _editGitServer = async (formValues: ManageGitServerValues) => {
        const { gitProvider } = formValues;
        const transformedValues = {
            ...formValues,
            sshPort: Number(formValues.sshPort),
            httpsPort: Number(formValues.httpsPort),
        };
        const usedValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);
        const gitServerData = editResource(GIT_SERVER_FORM_NAMES, gitServer.jsonData, usedValues);

        const editGerrit = async () => {
            const { sshPrivateKey, sshPublicKey, gitUser } = formValues;

            const gitServerSecretData = editResource(
                {
                    sshPrivateKey: {
                        name: 'sshPrivateKey',
                        path: ['data', 'id_rsa'],
                    },
                    sshPublicKey: {
                        name: 'sshPublicKey',
                        path: ['data', 'id_rsa.pub'],
                    },
                    gitUser: {
                        name: 'gitUser',
                        path: ['data', 'username'],
                    },
                },
                gitServerSecret,
                {
                    sshPrivateKey: safeEncode(sshPrivateKey),
                    sshPublicKey: safeEncode(sshPublicKey),
                    gitUser: safeEncode(gitUser),
                }
            );

            await editGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });

            if (onSuccess) {
                await onSuccess();
            }
        };

        const editGithub = async () => {
            const { sshPrivateKey, token, gitUser } = formValues;

            const gitServerSecretData = editResource(
                {
                    sshPrivateKey: {
                        name: 'sshPrivateKey',
                        path: ['data', 'id_rsa'],
                    },
                    token: {
                        name: 'token',
                        path: ['data', 'token'],
                    },
                    gitUser: {
                        name: 'gitUser',
                        path: ['data', 'username'],
                    },
                },
                gitServerSecret,
                {
                    sshPrivateKey: safeEncode(sshPrivateKey),
                    token: safeEncode(token),
                    gitUser: safeEncode(gitUser),
                }
            );

            await editGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });

            if (onSuccess) {
                await onSuccess();
            }
        };

        const editGitlab = async () => {
            const { sshPrivateKey, token } = formValues;

            const gitServerSecretData = editResource(
                {
                    sshPrivateKey: {
                        name: 'sshPrivateKey',
                        path: ['data', 'id_rsa'],
                    },
                    token: {
                        name: 'token',
                        path: ['data', 'token'],
                    },
                },
                gitServerSecret,
                {
                    sshPrivateKey: safeEncode(sshPrivateKey),
                    token: safeEncode(token),
                }
            );

            await editGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });

            if (onSuccess) {
                await onSuccess();
            }
        };

        switch (gitProvider) {
            case GIT_PROVIDERS.GERRIT:
                await editGerrit();
                break;
            case GIT_PROVIDERS.GITHUB:
                await editGithub();
                break;
            case GIT_PROVIDERS.GITLAB:
                await editGitlab();
                break;
            default:
                break;
        }
    };

    return { editGitServer: _editGitServer, isLoading };
};
