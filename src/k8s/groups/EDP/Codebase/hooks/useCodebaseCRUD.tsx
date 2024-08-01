import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { EDPKubeObjectInterface } from '../../../../../types/k8s';
import { CodebaseAuthData } from '../../../../../widgets/CreateEditCodebase/types';
import { CodebaseKubeObject } from '../index';
import { CodebaseKubeObjectInterface } from '../types';
import { createCodebaseSecretInstance } from '../utils/createCodebaseSecretInstance';

interface CreateCodebaseProps {
  codebaseData: CodebaseKubeObjectInterface;
  codebaseAuthData: CodebaseAuthData | null;
}

interface EditCodebaseProps {
  codebaseData: CodebaseKubeObjectInterface;
}

export const useCodebaseCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => {
    onSuccess && onSuccess();
  }, [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const codebaseCreateMutation = useResourceCRUDMutation<
    CodebaseKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codebaseCreateMutation', CodebaseKubeObject, CRUD_TYPES.CREATE);

  const codebaseSecretDeleteMutation = useResourceCRUDMutation<
    EDPKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('codebaseSecretDeleteMutation', K8s.secret.default, CRUD_TYPES.DELETE);

  const codebaseSecretCreateMutation = useResourceCRUDMutation<
    EDPKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codebaseSecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

  const codebaseEditMutation = useResourceCRUDMutation<
    CodebaseKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codebaseEditMutation', CodebaseKubeObject, CRUD_TYPES.EDIT);

  const createCodebase = React.useCallback(
    async ({ codebaseData, codebaseAuthData }: CreateCodebaseProps) => {
      if (codebaseAuthData === null) {
        codebaseCreateMutation.mutate(codebaseData, {
          onSuccess: () => {
            invokeOnSuccessCallback();
          },
          onError: () => {
            invokeOnErrorCallback();
          },
        });
        return;
      }

      const { repositoryLogin, repositoryPasswordOrApiToken } = codebaseAuthData;
      const {
        metadata: { name },
      } = codebaseData;
      const codebaseSecretData = createCodebaseSecretInstance({
        codebaseName: name,
        repositoryLogin,
        repositoryPassword: repositoryPasswordOrApiToken,
      });

      codebaseSecretCreateMutation.mutate(codebaseSecretData as EDPKubeObjectInterface, {
        onSuccess: () => {
          codebaseCreateMutation.mutate(codebaseData, {
            onSuccess: () => {
              invokeOnSuccessCallback();
            },
            onError: () => {
              codebaseSecretDeleteMutation.mutate(codebaseSecretData as EDPKubeObjectInterface);

              invokeOnErrorCallback();
            },
          });
        },
        onError: () => {
          codebaseSecretDeleteMutation.mutate(codebaseSecretData as EDPKubeObjectInterface);

          invokeOnErrorCallback();
        },
      });
    },
    [
      codebaseCreateMutation,
      codebaseSecretCreateMutation,
      codebaseSecretDeleteMutation,
      invokeOnErrorCallback,
      invokeOnSuccessCallback,
    ]
  );

  const editCodebase = React.useCallback(
    async ({ codebaseData }: EditCodebaseProps) => {
      codebaseEditMutation.mutate(codebaseData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [codebaseEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    codebaseCreateMutation,
    codebaseSecretCreateMutation,
    codebaseSecretDeleteMutation,
    codebaseEditMutation,
  };

  return { createCodebase, editCodebase, mutations };
};
