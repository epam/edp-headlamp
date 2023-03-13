import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { createCodebaseSecretInstance } from '../../../../configs/k8s-resource-instances/resources/secret';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useNamespace } from '../../../../hooks/useNamespace';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../../../plugin.globals';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { CodebaseAuthData } from '../../types';

const {
    K8s: { secret: SecretKubeObject },
} = pluginLib;

interface CreateCodebaseProps {
    codebaseData: EDPCodebaseKubeObjectInterface;
    codebaseAuthData: CodebaseAuthData | null;
}

export const useCreateCodebase = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createCodebase: (props: CreateCodebaseProps) => Promise<void>;
    mutations: {
        codebaseCreateMutation: UseMutationResult<
            EDPCodebaseKubeObjectInterface,
            Error,
            { codebaseData: EDPCodebaseKubeObjectInterface }
        >;
        codebaseSecretCreateMutation: UseMutationResult<
            EDPKubeObjectInterface,
            Error,
            { codebaseSecretData: EDPKubeObjectInterface }
        >;
        codebaseSecretDeleteMutation: UseMutationResult<
            void,
            Error,
            { codebaseSecretData: EDPKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);
    const { namespace } = useNamespace();
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const codebaseCreateMutation = useMutation<
        EDPCodebaseKubeObjectInterface,
        Error,
        {
            codebaseData: EDPCodebaseKubeObjectInterface;
        }
    >(
        'codebaseCreateMutation',
        ({ codebaseData }) => {
            return EDPCodebaseKubeObject.apiEndpoint.post(codebaseData);
        },
        {
            onMutate: ({ codebaseData }) =>
                showBeforeRequestMessage(codebaseData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { codebaseData }) => {
                showRequestSuccessMessage(codebaseData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { codebaseData }) => {
                showRequestErrorMessage(codebaseData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const codebaseSecretDeleteMutation = useMutation<
        void,
        Error,
        {
            codebaseSecretData: EDPKubeObjectInterface;
        }
    >(
        'codebaseSecretDeleteMutation',
        ({ codebaseSecretData }) => {
            return SecretKubeObject.default.apiEndpoint.delete(
                namespace,
                codebaseSecretData.metadata.name
            );
        },
        {
            onMutate: ({ codebaseSecretData }) =>
                showBeforeRequestMessage(codebaseSecretData.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, { codebaseSecretData }) =>
                showRequestSuccessMessage(codebaseSecretData.metadata.name, CRUD_TYPES.DELETE),
            onError: (error, { codebaseSecretData }) => {
                showRequestErrorMessage(codebaseSecretData.metadata.name, CRUD_TYPES.DELETE);
                console.error(error);
            },
        }
    );

    const codebaseSecretCreateMutation = useMutation<
        EDPKubeObjectInterface,
        Error,
        {
            codebaseSecretData: EDPKubeObjectInterface;
        }
    >(
        'codebaseSecretCreateMutation',
        ({ codebaseSecretData }) => {
            return SecretKubeObject.default.apiEndpoint.post(codebaseSecretData);
        },
        {
            onMutate: ({ codebaseSecretData }) =>
                showBeforeRequestMessage(codebaseSecretData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { codebaseSecretData }) => {
                showRequestSuccessMessage(codebaseSecretData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { codebaseSecretData }) => {
                showRequestErrorMessage(codebaseSecretData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const createCodebase = React.useCallback(
        async ({ codebaseData, codebaseAuthData }: CreateCodebaseProps) => {
            if (codebaseAuthData === null) {
                codebaseCreateMutation.mutate({ codebaseData });
                invokeOnSuccessCallback();
                return;
            }

            const { repositoryLogin, repositoryPasswordOrApiToken } = codebaseAuthData;
            const { name } = codebaseData;
            const codebaseSecretData = createCodebaseSecretInstance(
                name,
                repositoryLogin,
                repositoryPasswordOrApiToken
            );

            codebaseSecretCreateMutation.mutate(
                { codebaseSecretData: codebaseSecretData as EDPKubeObjectInterface },
                {
                    onSuccess: () => {
                        codebaseCreateMutation.mutate(
                            { codebaseData },
                            {
                                onError: () => {
                                    codebaseSecretDeleteMutation.mutate({
                                        codebaseSecretData:
                                            codebaseSecretData as EDPKubeObjectInterface,
                                    });

                                    invokeOnErrorCallback();
                                },
                            }
                        );

                        invokeOnSuccessCallback();
                    },
                    onError: () => {
                        codebaseSecretDeleteMutation.mutate({
                            codebaseSecretData: codebaseSecretData as EDPKubeObjectInterface,
                        });

                        invokeOnErrorCallback();
                    },
                }
            );
        },
        [
            codebaseCreateMutation,
            codebaseSecretCreateMutation,
            codebaseSecretDeleteMutation,
            invokeOnErrorCallback,
            invokeOnSuccessCallback,
        ]
    );

    const mutations = {
        codebaseCreateMutation,
        codebaseSecretCreateMutation,
        codebaseSecretDeleteMutation,
    };

    return { createCodebase, mutations };
};
