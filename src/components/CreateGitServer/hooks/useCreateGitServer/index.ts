import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useNamespace } from '../../../../hooks/useNamespace';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { pluginLib, React } from '../../../../plugin.globals';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

const {
    K8s: { secret: SecretKubeObject },
} = pluginLib;

interface CreateGitServerProps {
    gitServerData: EDPGitServerKubeObjectInterface;
    gitServerSecretData: EDPKubeObjectInterface;
}

export const useCreateGitServer = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createGitServer: (props: CreateGitServerProps) => Promise<void>;
    mutations: {
        gitServerCreateMutation: UseMutationResult<
            EDPGitServerKubeObjectInterface,
            Error,
            { gitServerData: EDPGitServerKubeObjectInterface }
        >;
        gitServerSecretCreateMutation: UseMutationResult<
            EDPKubeObjectInterface,
            Error,
            { gitServerSecretData: EDPKubeObjectInterface }
        >;
        gitServerSecretDeleteMutation: UseMutationResult<
            void,
            Error,
            { gitServerSecretData: EDPKubeObjectInterface }
        >;
    };
} => {
    const { namespace } = useNamespace();
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const gitServerCreateMutation = useMutation<
        EDPGitServerKubeObjectInterface,
        Error,
        {
            gitServerData: EDPGitServerKubeObjectInterface;
        }
    >(
        'gitServerCreateMutation',
        ({ gitServerData }) => {
            return EDPGitServerKubeObject.apiEndpoint.post(gitServerData);
        },
        {
            onMutate: ({ gitServerData }) =>
                showBeforeRequestMessage(gitServerData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { gitServerData }) => {
                showRequestSuccessMessage(gitServerData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { gitServerData }) => {
                showRequestErrorMessage(gitServerData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const gitServerSecretDeleteMutation = useMutation<
        void,
        Error,
        {
            gitServerSecretData: EDPKubeObjectInterface;
        }
    >(
        'gitServerSecretDeleteMutation',
        ({ gitServerSecretData }) => {
            return SecretKubeObject.default.apiEndpoint.delete(
                namespace,
                gitServerSecretData.metadata.name
            );
        },
        {
            onMutate: ({ gitServerSecretData }) =>
                showBeforeRequestMessage(gitServerSecretData.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, { gitServerSecretData }) =>
                showRequestSuccessMessage(gitServerSecretData.metadata.name, CRUD_TYPES.DELETE),
            onError: (error, { gitServerSecretData }) => {
                showRequestErrorMessage(gitServerSecretData.metadata.name, CRUD_TYPES.DELETE);
                console.error(error);
            },
        }
    );

    const gitServerSecretCreateMutation = useMutation<
        EDPKubeObjectInterface,
        Error,
        {
            gitServerSecretData: EDPKubeObjectInterface;
        }
    >(
        'gitServerSecretCreateMutation',
        ({ gitServerSecretData }) => {
            return SecretKubeObject.default.apiEndpoint.post(gitServerSecretData);
        },
        {
            onMutate: ({ gitServerSecretData }) =>
                showBeforeRequestMessage(gitServerSecretData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { gitServerSecretData }) => {
                showRequestSuccessMessage(gitServerSecretData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { gitServerSecretData }) => {
                showRequestErrorMessage(gitServerSecretData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const createGitServer = React.useCallback(
        async ({ gitServerData, gitServerSecretData }: CreateGitServerProps) => {
            gitServerSecretCreateMutation.mutate(
                { gitServerSecretData },
                {
                    onSuccess: () => {
                        gitServerCreateMutation.mutate(
                            { gitServerData },
                            {
                                onError: () => {
                                    gitServerSecretDeleteMutation.mutate({ gitServerSecretData });

                                    if (onError) {
                                        onError();
                                    }
                                },
                            }
                        );

                        if (onSuccess) {
                            onSuccess();
                        }
                    },
                    onError: () => {
                        gitServerSecretDeleteMutation.mutate({ gitServerSecretData });

                        if (onError) {
                            onError();
                        }
                    },
                }
            );
        },
        [
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
            onError,
            onSuccess,
        ]
    );

    const mutations = {
        gitServerCreateMutation,
        gitServerSecretCreateMutation,
        gitServerSecretDeleteMutation,
    };

    return { createGitServer, mutations };
};
