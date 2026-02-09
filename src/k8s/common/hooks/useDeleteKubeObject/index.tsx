import { KubeObject, KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { OptionsObject, VariantType } from 'notistack';
import React from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { Snackbar } from '../../../../components/Snackbar';
import { CRUD_TYPE } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';

interface DeleteKubeObjectProps {
  variables: EDPKubeObjectInterface;
  kubeObject: KubeObject;
}

interface Message {
  message: string;
  options?: OptionsObject;
}

type CustomMessages = {
  onMutate?: Message;
  onError?: Message;
  onSuccess?: Message;
};

const getDefaultOptions = (variant: VariantType) => {
  return {
    autoHideDuration: 2000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    variant,
    content: (key: string, message: string) => (
      <Snackbar snackbarKey={key} text={String(message)} variant={variant} />
    ),
  } as const;
};

export const useDeleteKubeObject = ({
  onSuccess,
  onError,
  createCustomMessages,
}: {
  onSuccess?: () => void;
  onError?: () => void;
  createCustomMessages?: (item: EDPKubeObjectInterface) => CustomMessages;
}): {
  deleteKubeObject: (props: DeleteKubeObjectProps) => Promise<void>;
  mutations: {
    kubeObjectDeleteMutation: UseMutationResult<
      void,
      Error,
      { variables: EDPKubeObjectInterface; kubeObject: KubeObject }
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
      variables: EDPKubeObjectInterface;
      kubeObject: KubeObjectClass;
    }
  >(
    'kubeObjectDeleteMutation',
    ({ variables, kubeObject }) => {
      return kubeObject.apiEndpoint.delete(namespace, variables.metadata.name);
    },
    {
      onMutate: ({ variables }) => {
        if (!createCustomMessages) {
          showBeforeRequestMessage(CRUD_TYPE.DELETE, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
        } else {
          const customMessage = createCustomMessages(variables)?.onMutate;

          const mergedOptions: OptionsObject = {
            ...getDefaultOptions('info'),
            ...(customMessage?.options || {}),
          };

          showBeforeRequestMessage(CRUD_TYPE.DELETE, {
            customMessage: {
              message: customMessage?.message || '',
              options: mergedOptions,
            },
          });
        }
      },
      onSuccess: (data, { variables }) => {
        if (!createCustomMessages) {
          showRequestSuccessMessage(CRUD_TYPE.DELETE, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
        } else {
          const customMessage = createCustomMessages(variables)?.onSuccess;

          const mergedOptions: OptionsObject = {
            ...getDefaultOptions('success'),
            ...(customMessage?.options || {}),
          };

          showRequestSuccessMessage(CRUD_TYPE.DELETE, {
            customMessage: {
              message: customMessage?.message || '',
              options: mergedOptions,
            },
          });
        }
      },
      onError: (error, { variables }) => {
        if (!createCustomMessages) {
          showRequestErrorMessage(CRUD_TYPE.DELETE, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
        } else {
          const customMessage = createCustomMessages(variables)?.onError;

          const mergedOptions: OptionsObject = {
            ...getDefaultOptions('error'),
            ...(customMessage?.options || {}),
          };

          showRequestErrorMessage(CRUD_TYPE.DELETE, {
            customMessage: {
              message: customMessage?.message || '',
              options: mergedOptions,
            },
          });
        }
      },
    }
  );

  const deleteKubeObject = React.useCallback(
    async ({ variables, kubeObject }: DeleteKubeObjectProps) => {
      kubeObjectDeleteMutation.mutate(
        { variables, kubeObject },
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
