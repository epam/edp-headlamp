import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

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
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const gitServerCreateMutation = useResourceCRUDMutation<
        EDPGitServerKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('gitServerCreateMutation', EDPGitServerKubeObject, CRUD_TYPES.CREATE);

    const gitServerSecretDeleteMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('gitServerSecretDeleteMutation', K8s.secret.default, CRUD_TYPES.DELETE);

    const gitServerSecretCreateMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('gitServerSecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

    const createGitServer = React.useCallback(
        async ({ gitServerData, gitServerSecretData }: CreateGitServerProps) => {
            gitServerSecretCreateMutation.mutate(gitServerSecretData, {
                onSuccess: () => {
                    gitServerCreateMutation.mutate(gitServerData, {
                        onError: () => {
                            gitServerSecretDeleteMutation.mutate(gitServerSecretData);

                            invokeOnErrorCallback();
                        },
                    });

                    invokeOnSuccessCallback();
                },
                onError: () => {
                    gitServerSecretDeleteMutation.mutate(gitServerSecretData);

                    invokeOnErrorCallback();
                },
            });
        },
        [
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
            invokeOnErrorCallback,
            invokeOnSuccessCallback,
        ]
    );

    const mutations = {
        gitServerCreateMutation,
        gitServerSecretCreateMutation,
        gitServerSecretDeleteMutation,
    };

    return { createGitServer, mutations };
};
