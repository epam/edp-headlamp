import { KubeObjectIface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { OptionsObject } from 'notistack';
import React from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { Snackbar } from '../../components/Snackbar';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { useRequestStatusMessages } from '../useResourceRequestStatusMessages';

type UseResourceCRUDMutationReturnType<
  KubeObjectData,
  Mode extends CRUD_TYPES
> = Mode extends CRUD_TYPES.DELETE ? void : KubeObjectData;

interface Message {
  message: string;
  options?: OptionsObject;
}

type CustomMessages = {
  onMutate?: Message;
  onError?: Message;
  onSuccess?: Message;
};

interface Options<KubeObjectData> {
  createCustomMessages?: (item: KubeObjectData) => CustomMessages;
  showMessages?: boolean;
}

export const useResourceCRUDMutation = <
  KubeObjectData extends EDPKubeObjectInterface,
  Mode extends CRUD_TYPES
>(
  mutationKey: string,
  kubeObject: KubeObjectIface<any>,
  mode: Mode,
  options?: Options<KubeObjectData>
): UseMutationResult<
  UseResourceCRUDMutationReturnType<KubeObjectData, Mode>,
  Error,
  KubeObjectData
> => {
  const showMessages = options?.showMessages ?? true;

  const {
    showBeforeRequestMessage,
    showRequestErrorMessage,
    showRequestSuccessMessage,
    showRequestErrorDetailedMessage,
  } = useRequestStatusMessages();

  const namespace = getDefaultNamespace();

  return useMutation<
    UseResourceCRUDMutationReturnType<KubeObjectData, Mode>,
    Error,
    KubeObjectData
  >(
    mutationKey,
    (data) => {
      let dataCopy = { ...data };

      if (!data.metadata?.namespace) {
        dataCopy = {
          ...dataCopy,
          metadata: {
            ...dataCopy.metadata,
            namespace,
          },
        };
      }

      switch (mode) {
        case CRUD_TYPES.CREATE:
          return kubeObject.apiEndpoint.post(dataCopy);
        case CRUD_TYPES.EDIT:
          return kubeObject.apiEndpoint.put(dataCopy);
        case CRUD_TYPES.DELETE:
          return kubeObject.apiEndpoint.delete(dataCopy.metadata.namespace, dataCopy.metadata.name);
      }
    },
    {
      onMutate: (variables) => {
        if (!showMessages) {
          return;
        }

        if (!options?.createCustomMessages) {
          showBeforeRequestMessage(mode, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
          return;
        }

        const defaultOptions = {
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          variant: 'info',
          content: (key, message) => (
            <Snackbar snackbarKey={key} text={String(message)} variant="info" />
          ),
        } as const;

        const customMessage = options?.createCustomMessages(variables)?.onMutate;

        const mergedOptions: OptionsObject = {
          ...defaultOptions,
          ...(customMessage?.options || {}),
        };

        showBeforeRequestMessage(mode, {
          customMessage: {
            message: customMessage.message,
            options: mergedOptions,
          },
        });
      },
      onSuccess: (data, variables) => {
        if (!showMessages) {
          return;
        }

        if (!options?.createCustomMessages) {
          showRequestSuccessMessage(mode, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
          return;
        }

        const defaultOptions = {
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          variant: 'success',
          content: (key, message) => (
            <Snackbar snackbarKey={key} text={String(message)} variant="success" />
          ),
        } as const;

        const customMessage = options?.createCustomMessages(variables)?.onSuccess;

        const mergedOptions: OptionsObject = {
          ...defaultOptions,
          ...(customMessage?.options || {}),
        };

        showRequestSuccessMessage(mode, {
          customMessage: {
            message: customMessage.message,
            options: mergedOptions,
          },
        });
      },
      onError: (error, variables) => {
        if (!showMessages) {
          return;
        }

        if (!options?.createCustomMessages) {
          showRequestErrorMessage(mode, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
          return;
        }

        const defaultOptions = {
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          variant: 'error',
          content: (key, message) => (
            <Snackbar snackbarKey={key} text={String(message)} variant="error" />
          ),
        } as const;

        const customMessage = options?.createCustomMessages(variables)?.onError;

        const mergedOptions: OptionsObject = {
          ...defaultOptions,
          ...(customMessage?.options || {}),
        };

        showRequestErrorMessage(mode, {
          customMessage: {
            message: customMessage.message,
            options: mergedOptions,
          },
        });
        showRequestErrorDetailedMessage(error);
        console.error(error);
      },
    }
  );
};
