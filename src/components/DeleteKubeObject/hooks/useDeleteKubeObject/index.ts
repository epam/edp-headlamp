import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useNamespace } from '../../../../hooks/useNamespace';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { React } from '../../../../plugin.globals';
import { k8s } from '../../../../plugin.types';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

interface DeleteKubeObjectProps {
    kubeObjectData: EDPKubeObjectInterface;
    kubeObject: k8s.cluster.KubeObject;
}

export const useDeleteKubeObject = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    deleteKubeObject: (props: DeleteKubeObjectProps) => Promise<void>;
    mutations: {
        kubeObjectDeleteMutation: UseMutationResult<
            void,
            Error,
            { kubeObjectData: EDPKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);
    const { namespace } = useNamespace();
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const kubeObjectDeleteMutation = useMutation<
        void,
        Error,
        {
            kubeObjectData: EDPKubeObjectInterface;
            kubeObject: k8s.cluster.KubeObject;
        }
    >(
        'kubeObjectDeleteMutation',
        ({ kubeObjectData, kubeObject }) => {
            return kubeObject.apiEndpoint.delete(kubeObjectData, namespace);
        },
        {
            onMutate: ({ kubeObjectData }) =>
                showBeforeRequestMessage(kubeObjectData.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, { kubeObjectData }) => {
                showRequestSuccessMessage(kubeObjectData.metadata.name, CRUD_TYPES.DELETE);
            },
            onError: (error, { kubeObjectData }) => {
                showRequestErrorMessage(kubeObjectData.metadata.name, CRUD_TYPES.DELETE);
            },
        }
    );

    const deleteKubeObject = React.useCallback(
        async ({ kubeObjectData, kubeObject }: DeleteKubeObjectProps) => {
            kubeObjectDeleteMutation.mutate(
                { kubeObjectData, kubeObject },
                {
                    onSuccess: () => {
                        invokeOnSuccessCallback();
                    },
                    onError: () => {
                        invokeOnErrorCallback();
                    },
                }
            );
        },
        [invokeOnErrorCallback, invokeOnSuccessCallback, kubeObjectDeleteMutation]
    );

    const mutations = {
        kubeObjectDeleteMutation,
    };

    return { deleteKubeObject, mutations };
};
