import { useCallback } from 'react';
import { createCodebaseSecretInstance } from '../../../../configs/k8s-resource-instances/resources/secret';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
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
}) => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

    const codebaseCreateMutation = useResourceCRUDMutation<
        EDPCodebaseKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('codebaseCreateMutation', EDPCodebaseKubeObject, CRUD_TYPES.CREATE);

    const codebaseSecretDeleteMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('codebaseSecretDeleteMutation', SecretKubeObject.default, CRUD_TYPES.DELETE);

    const codebaseSecretCreateMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('codebaseSecretCreateMutation', SecretKubeObject.default, CRUD_TYPES.CREATE);

    const createCodebase = React.useCallback(
        async ({ codebaseData, codebaseAuthData }: CreateCodebaseProps) => {
            if (codebaseAuthData === null) {
                codebaseCreateMutation.mutate(codebaseData, {
                    onSuccess: () => {
                        invokeOnSuccessCallback();
                    },
                    onError: () => {
                        invokeOnErrorCallback();
                    },
                });
                return;
            }

            const { repositoryLogin, repositoryPasswordOrApiToken } = codebaseAuthData;
            const {
                metadata: { name },
            } = codebaseData;
            const codebaseSecretData = createCodebaseSecretInstance(
                name,
                repositoryLogin,
                repositoryPasswordOrApiToken
            );

            codebaseSecretCreateMutation.mutate(codebaseSecretData as EDPKubeObjectInterface, {
                onSuccess: () => {
                    codebaseCreateMutation.mutate(codebaseData, {
                        onError: () => {
                            codebaseSecretDeleteMutation.mutate(
                                codebaseSecretData as EDPKubeObjectInterface
                            );

                            invokeOnErrorCallback();
                        },
                    });

                    invokeOnSuccessCallback();
                },
                onError: () => {
                    codebaseSecretDeleteMutation.mutate(
                        codebaseSecretData as EDPKubeObjectInterface
                    );

                    invokeOnErrorCallback();
                },
            });
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
