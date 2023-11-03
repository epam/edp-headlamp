import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { EDPGitServerKubeObject } from '../index';
import { EDPGitServerKubeObjectInterface } from '../types';

interface CreateGitServerProps {
    gitServerData: EDPGitServerKubeObjectInterface;
    gitServerSecretData: EDPKubeObjectInterface;
}

interface EditGitServerProps {
    gitServerData: EDPGitServerKubeObjectInterface;
    gitServerSecretData: EDPKubeObjectInterface;
}

export const useGitServerCRUD = ({
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

    const gitServerEditMutation = useResourceCRUDMutation<
        EDPGitServerKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('gitServerEditMutation', EDPGitServerKubeObject, CRUD_TYPES.EDIT);

    const gitServerSecretDeleteMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('gitServerSecretDeleteMutation', K8s.secret.default, CRUD_TYPES.DELETE);

    const gitServerSecretCreateMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('gitServerSecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

    const gitServerSecretEditMutation = useResourceCRUDMutation<
        EDPKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('gitServerSecretEditMutation', K8s.secret.default, CRUD_TYPES.EDIT);

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

    const editGitServer = React.useCallback(
        async ({ gitServerData, gitServerSecretData }: EditGitServerProps) => {
            gitServerEditMutation.mutate(gitServerData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });

            gitServerSecretEditMutation.mutate(gitServerSecretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [
            gitServerEditMutation,
            gitServerSecretEditMutation,
            invokeOnErrorCallback,
            invokeOnSuccessCallback,
        ]
    );

    const mutations = {
        gitServerCreateMutation,
        gitServerSecretCreateMutation,
        gitServerSecretDeleteMutation,
    };

    return { createGitServer, editGitServer, mutations };
};
