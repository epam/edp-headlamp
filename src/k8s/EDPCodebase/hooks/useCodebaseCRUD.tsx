import { K8s, Router } from '@kinvolk/headlamp-plugin/lib';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Snackbar } from '../../../components/Snackbar';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { routeEDPComponentDetails } from '../../../pages/edp-component-details/route';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { CodebaseAuthData } from '../../../widgets/CreateEditCodebase/types';
import { createCodebaseSecretInstance } from '../../Secret/utils/createCodebaseSecretInstance';
import { EDPCodebaseKubeObject } from '../index';
import { EDPCodebaseKubeObjectInterface } from '../types';

interface CreateCodebaseProps {
  codebaseData: EDPCodebaseKubeObjectInterface;
  codebaseAuthData: CodebaseAuthData | null;
}

interface EditCodebaseProps {
  codebaseData: EDPCodebaseKubeObjectInterface;
}

export const useCodebaseCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const invokeOnSuccessCallback = React.useCallback(
    (codebaseData: EDPCodebaseKubeObjectInterface) => {
      onSuccess && onSuccess();

      const codebaseRoute = Router.createRouteURL(routeEDPComponentDetails.path, {
        namespace: codebaseData.metadata.namespace || getDefaultNamespace(),
        name: codebaseData.metadata.name,
      });

      enqueueSnackbar('', {
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        content: (key, message) => (
          <Snackbar
            text={String(message)}
            id={String(key)}
            link={codebaseRoute}
            variant="success"
          />
        ),
      });
    },
    [enqueueSnackbar, onSuccess]
  );
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const codebaseCreateMutation = useResourceCRUDMutation<
    EDPCodebaseKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codebaseCreateMutation', EDPCodebaseKubeObject, CRUD_TYPES.CREATE);

  const codebaseSecretDeleteMutation = useResourceCRUDMutation<
    EDPKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('codebaseSecretDeleteMutation', K8s.secret.default, CRUD_TYPES.DELETE);

  const codebaseSecretCreateMutation = useResourceCRUDMutation<
    EDPKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codebaseSecretCreateMutation', K8s.secret.default, CRUD_TYPES.CREATE);

  const codebaseEditMutation = useResourceCRUDMutation<
    EDPCodebaseKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codebaseEditMutation', EDPCodebaseKubeObject, CRUD_TYPES.EDIT);

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
