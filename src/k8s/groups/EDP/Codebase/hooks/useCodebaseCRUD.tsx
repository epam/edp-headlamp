import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { EDPKubeObjectInterface } from '../../../../../types/k8s';
import { CodebaseAuthData } from '../../../../../widgets/dialogs/ManageCodebase/types';
import { CodebaseKubeObject } from '..';
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
  onSuccess?: (codebaseData: CodebaseKubeObjectInterface) => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(
    (codebaseData: CodebaseKubeObjectInterface) => {
      onSuccess && onSuccess(codebaseData);
    },
    [onSuccess]
  );
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const codebaseCreateMutation = useResourceCRUDMutation<
    CodebaseKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('codebaseCreateMutation', CodebaseKubeObject, CRUD_TYPE.CREATE);

  const codebaseSecretDeleteMutation = useResourceCRUDMutation<
    EDPKubeObjectInterface,
    typeof CRUD_TYPE.DELETE
  >('codebaseSecretDeleteMutation', K8s.secret.default, CRUD_TYPE.DELETE);

  const codebaseSecretCreateMutation = useResourceCRUDMutation<
    EDPKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('codebaseSecretCreateMutation', K8s.secret.default, CRUD_TYPE.CREATE);

  const codebaseEditMutation = useResourceCRUDMutation<
    CodebaseKubeObjectInterface,
    typeof CRUD_TYPE.EDIT
  >('codebaseEditMutation', CodebaseKubeObject, CRUD_TYPE.EDIT);

  const createCodebase = React.useCallback(
    async ({ codebaseData, codebaseAuthData }: CreateCodebaseProps) => {
      if (codebaseAuthData === null) {
        codebaseCreateMutation.mutate(codebaseData, {
          onSuccess: () => {
            invokeOnSuccessCallback(codebaseData);
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
              invokeOnSuccessCallback(codebaseData);
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
          invokeOnSuccessCallback(codebaseData);
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
