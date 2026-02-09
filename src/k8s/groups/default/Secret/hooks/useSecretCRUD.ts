import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';

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

  const secretCreateMutation = useResourceCRUDMutation<
    KubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('secretCreateMutation', K8s.secret.default, CRUD_TYPE.CREATE);

  const secretEditMutation = useResourceCRUDMutation<KubeObjectInterface, typeof CRUD_TYPE.EDIT>(
    'secretEditMutation',
    K8s.secret.default,
    CRUD_TYPE.EDIT
  );

  const secretDeleteMutation = useResourceCRUDMutation<
    KubeObjectInterface,
    typeof CRUD_TYPE.DELETE
  >('secretDeleteMutation', K8s.secret.default, CRUD_TYPE.DELETE);

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
