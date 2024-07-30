import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { ServiceAccountKubeObject } from '../index';
import { ServiceAccountKubeObjectInterface } from '../types';

interface EditServiceAccountProps {
  serviceAccount: ServiceAccountKubeObjectInterface;
}

export const useEditServiceAccount = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const serviceAccountEditMutation = useResourceCRUDMutation<KubeObjectInterface, CRUD_TYPES.EDIT>(
    'serviceAccountEditMutation',
    ServiceAccountKubeObject,
    CRUD_TYPES.EDIT
  );

  const editServiceAccount = React.useCallback(
    async ({ serviceAccount }: EditServiceAccountProps) => {
      serviceAccountEditMutation.mutate(serviceAccount, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [serviceAccountEditMutation, invokeOnSuccessCallback, invokeOnErrorCallback]
  );

  const mutations = {
    serviceAccountEditMutation,
  };

  return { editServiceAccount, mutations };
};
