import { KubeObjectIface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { OptionsObject, VariantType } from 'notistack';
import React from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { Snackbar } from '../../components/Snackbar';
import { CRUD_TYPE, CRUDType } from '../../constants/crudTypes';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { useRequestStatusMessages } from '../useResourceRequestStatusMessages';

type UseResourceCRUDMutationReturnType<
  KubeObjectData,
  Mode extends CRUDType
> = Mode extends typeof CRUD_TYPE.DELETE ? void : KubeObjectData;

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

export const useResourceCRUDMutation = <
  KubeObjectData extends EDPKubeObjectInterface,
  Mode extends CRUDType
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
        case CRUD_TYPE.CREATE:
          return kubeObject.apiEndpoint.post(dataCopy);
        case CRUD_TYPE.EDIT:
          return kubeObject.apiEndpoint.put(dataCopy);
        case CRUD_TYPE.DELETE:
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
        } else {
          const customMessage = options?.createCustomMessages(variables)?.onMutate;

          const mergedOptions: OptionsObject = {
            ...getDefaultOptions('info'),
            ...(customMessage?.options || {}),
          };

          showBeforeRequestMessage(mode, {
            customMessage: {
              message: customMessage?.message || '',
              options: mergedOptions,
            },
          });
        }
      },
      onSuccess: (data, variables) => {
        if (!showMessages) {
          return;
        }

        if (!options?.createCustomMessages) {
          showRequestSuccessMessage(mode, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
        } else {
          const customMessage = options?.createCustomMessages(variables)?.onSuccess;

          const mergedOptions: OptionsObject = {
            ...getDefaultOptions('success'),
            ...(customMessage?.options || {}),
          };

          showRequestSuccessMessage(mode, {
            customMessage: {
              message: customMessage?.message || '',
              options: mergedOptions,
            },
          });
        }
      },
      onError: (error, variables) => {
        if (!showMessages) {
          return;
        }

        if (!options?.createCustomMessages) {
          showRequestErrorMessage(mode, {
            entityName: `${variables.kind} ${variables.metadata.name}`,
          });
        } else {
          const customMessage = options?.createCustomMessages(variables)?.onError;

          const mergedOptions: OptionsObject = {
            ...getDefaultOptions('error'),
            ...(customMessage?.options || {}),
          };

          showRequestErrorMessage(mode, {
            customMessage: {
              message: customMessage?.message || '',
              options: mergedOptions,
            },
          });
        }

        showRequestErrorDetailedMessage(error);
        console.error(error);
      },
    }
  );
};
