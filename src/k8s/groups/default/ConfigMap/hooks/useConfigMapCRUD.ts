import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { ConfigMapKubeObjectInterface } from '../types';

interface EditConfigMapProps {
  configMapData: ConfigMapKubeObjectInterface;
}

export const useConfigMapCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const configMapEditMutation = useResourceCRUDMutation<KubeObjectInterface, CRUD_TYPE.EDIT>(
    'configMapEditMutation',
    K8s.configMap.default,
    CRUD_TYPE.EDIT
  );

  const editConfigMap = React.useCallback(
    async ({ configMapData }: EditConfigMapProps) => {
      configMapEditMutation.mutate(configMapData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [configMapEditMutation, invokeOnSuccessCallback, invokeOnErrorCallback]
  );

  const mutations = {
    configMapEditMutation,
  };

  return { editConfigMap, mutations };
};
