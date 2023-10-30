import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';

interface CreateSecretProps {
    secretData: KubeObjectInterface;
}

export const useSecretCRUD = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const secretCreateMutation = useResourceCRUDMutation<KubeObjectInterface, CRUD_TYPES.CREATE>(
        'secretCreateMutation',
        K8s.secret.default,
        CRUD_TYPES.CREATE
    );

    const secretEditMutation = useResourceCRUDMutation<KubeObjectInterface, CRUD_TYPES.EDIT>(
        'secretEditMutation',
        K8s.secret.default,
        CRUD_TYPES.EDIT
    );

    const secretDeleteMutation = useResourceCRUDMutation<KubeObjectInterface, CRUD_TYPES.DELETE>(
        'secretDeleteMutation',
        K8s.secret.default,
        CRUD_TYPES.DELETE
    );

    const createSecret = React.useCallback(
        async ({ secretData }: CreateSecretProps) => {
            secretCreateMutation.mutate(secretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [secretCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const editSecret = React.useCallback(
        async ({ secretData }: CreateSecretProps) => {
            secretEditMutation.mutate(secretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [secretEditMutation, invokeOnSuccessCallback, invokeOnErrorCallback]
    );

    const deleteSecret = React.useCallback(
        async ({ secretData }: CreateSecretProps) => {
            secretDeleteMutation.mutate(secretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [secretDeleteMutation, invokeOnSuccessCallback, invokeOnErrorCallback]
    );

    const mutations = {
        secretCreateMutation,
        secretEditMutation,
        secretDeleteMutation,
    };

    return { createSecret, editSecret, deleteSecret, mutations };
};
