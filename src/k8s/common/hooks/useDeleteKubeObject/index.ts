import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

interface DeleteKubeObjectProps {
  kubeObjectData: EDPKubeObjectInterface;
  kubeObject: KubeObject;
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
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);
  const namespace = getDefaultNamespace();
  const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
    useRequestStatusMessages();

  const kubeObjectDeleteMutation = useMutation<
    void,
    Error,
    {
      kubeObjectData: EDPKubeObjectInterface;
      kubeObject: KubeObject;
    }
  >(
    'kubeObjectDeleteMutation',
    ({ kubeObjectData, kubeObject }) => {
      return kubeObject.apiEndpoint.delete(namespace, kubeObjectData.metadata.name);
    },
    {
      onMutate: ({ kubeObjectData }) =>
        showBeforeRequestMessage(CRUD_TYPES.DELETE, {
          entityName: `${kubeObjectData.kind} ${kubeObjectData.metadata.name}`,
        }),
      onSuccess: (data, { kubeObjectData }) => {
        showRequestSuccessMessage(CRUD_TYPES.DELETE, {
          entityName: `${kubeObjectData.kind} ${kubeObjectData.metadata.name}`,
        });
      },
      onError: (error, { kubeObjectData }) => {
        showRequestErrorMessage(CRUD_TYPES.DELETE, {
          entityName: `${kubeObjectData.kind} ${kubeObjectData.metadata.name}`,
        });
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
