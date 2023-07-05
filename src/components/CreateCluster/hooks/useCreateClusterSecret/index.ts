import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';

interface CreateClusterProps {
    clusterSecretData: KubeObjectInterface;
}

export const useCreateClusterSecret = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const clusterSecretCreateMutation = useResourceCRUDMutation<
        KubeObjectInterface,
        CRUD_TYPES.CREATE
    >('clusterSecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

    const createClusterSecret = React.useCallback(
        async ({ clusterSecretData }: CreateClusterProps) => {
            clusterSecretCreateMutation.mutate(clusterSecretData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [clusterSecretCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        clusterSecretCreateMutation,
    };

    return { createClusterSecret, mutations };
};
