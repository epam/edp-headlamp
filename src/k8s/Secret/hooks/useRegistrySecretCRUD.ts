import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';

interface CreateRegistrySecretProps {
    registrySecretData: KubeObjectInterface;
}

export const useRegistrySecretCRUD = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const registrySecretCreateMutation = useResourceCRUDMutation<
        KubeObjectInterface,
        CRUD_TYPES.CREATE
    >('registrySecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

    const registrySecretEditMutation = useResourceCRUDMutation<
        KubeObjectInterface,
        CRUD_TYPES.EDIT
    >('registrySecretEditMutation', K8s.secret.default, CRUD_TYPES.EDIT);

    const registrySecretDeleteMutation = useResourceCRUDMutation<
        KubeObjectInterface,
        CRUD_TYPES.DELETE
    >('registrySecretDeleteMutation', K8s.secret.default, CRUD_TYPES.DELETE);

    const createRegistrySecret = React.useCallback(
        async ({ registrySecretData }: CreateRegistrySecretProps) => {
            registrySecretCreateMutation.mutate(registrySecretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [registrySecretCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const editRegistrySecret = React.useCallback(
        async ({ registrySecretData }: CreateRegistrySecretProps) => {
            registrySecretEditMutation.mutate(registrySecretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [registrySecretEditMutation, invokeOnSuccessCallback, invokeOnErrorCallback]
    );

    const deleteRegistrySecret = React.useCallback(
        async ({ registrySecretData }: CreateRegistrySecretProps) => {
            registrySecretDeleteMutation.mutate(registrySecretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [registrySecretDeleteMutation, invokeOnSuccessCallback, invokeOnErrorCallback]
    );

    const mutations = {
        registrySecretCreateMutation,
        registrySecretEditMutation,
        registrySecretDeleteMutation,
    };

    return { createRegistrySecret, editRegistrySecret, deleteRegistrySecret, mutations };
};
