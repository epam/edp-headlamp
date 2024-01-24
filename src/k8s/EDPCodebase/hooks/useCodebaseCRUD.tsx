import { Icon } from '@iconify/react';
import { K8s, Router } from '@kinvolk/headlamp-plugin/lib';
import { IconButton, Link, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../../icons/iconify-icons-mapping';
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const invokeOnSuccessCallback = React.useCallback(
    (codebaseData: EDPCodebaseKubeObjectInterface) => {
      onSuccess && onSuccess();

      const codebaseRoute = Router.createRouteURL(routeEDPComponentDetails.path, {
        namespace: codebaseData.metadata.namespace || getDefaultNamespace(),
        name: codebaseData.metadata.name,
      });
      enqueueSnackbar(
        <Typography>
          <span>Navigate to </span>
          <Link
            component="button"
            variant="body2"
            underline={'always'}
            onClick={() => {
              history.push(codebaseRoute);
              closeSnackbar();
            }}
          >
            {codebaseData.metadata.name}
          </Link>
          <span> page</span>
        </Typography>,
        {
          autoHideDuration: 10000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={ICONS.CROSS} />
            </IconButton>
          ),
        }
      );
    },
    [closeSnackbar, enqueueSnackbar, history, onSuccess]
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
