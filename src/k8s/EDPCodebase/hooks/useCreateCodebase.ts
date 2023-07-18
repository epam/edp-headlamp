import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { CodebaseAuthData } from '../../../widgets/CreateCodebase/types';
import { createCodebaseSecretInstance } from '../../Secret/utils/createCodebaseSecretInstance';
import { EDPCodebaseKubeObject } from '../index';
import { EDPCodebaseKubeObjectInterface } from '../types';

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
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const codebaseCreateMutation = useResourceCRUDMutation<
        EDPCodebaseKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('codebaseCreateMutation', EDPCodebaseKubeObject, CRUD_TYPES.CREATE);

    const codebaseSecretDeleteMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('codebaseSecretDeleteMutation', K8s.secret.default, CRUD_TYPES.DELETE);

    const codebaseSecretCreateMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('codebaseSecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

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
            const codebaseSecretData = createCodebaseSecretInstance({
                codebaseName: name,
                repositoryLogin,
                repositoryPassword: repositoryPasswordOrApiToken,
            });

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
