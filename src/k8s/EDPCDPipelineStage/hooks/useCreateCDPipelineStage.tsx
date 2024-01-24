import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { IconButton, Link, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { routeEDPStageDetails } from '../../../pages/edp-stage-details/route';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCDPipelineStageKubeObject } from '../index';
import { EDPCDPipelineStageKubeObjectInterface } from '../types';

interface CreateCDPipelineStageProps {
  CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
}

export const useCreateCDPipelineStage = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const invokeOnSuccessCallback = React.useCallback(
    (CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface) => {
      onSuccess && onSuccess();

      const CDPipelineStageRoute = Router.createRouteURL(routeEDPStageDetails.path, {
        CDPipelineName: CDPipelineStageData.spec.cdPipeline,
        namespace: CDPipelineStageData.metadata.namespace || getDefaultNamespace(),
        stageName: CDPipelineStageData.metadata.name,
      });
      enqueueSnackbar(
        <Typography>
          <span>Navigate to </span>
          <Link
            component="button"
            variant="body2"
            underline={'always'}
            onClick={() => {
              history.push(CDPipelineStageRoute);
              closeSnackbar();
            }}
          >
            {CDPipelineStageData.metadata.name}
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

  const CDPipelineStageCreateMutation = useResourceCRUDMutation<
    EDPCDPipelineStageKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineStageCreateMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.CREATE);

  const createCDPipelineStage = React.useCallback(
    async ({ CDPipelineStageData }: CreateCDPipelineStageProps) => {
      CDPipelineStageCreateMutation.mutate(CDPipelineStageData, {
        onSuccess: () => {
          invokeOnSuccessCallback(CDPipelineStageData);
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [CDPipelineStageCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    CDPipelineStageCreateMutation,
  };

  return { createCDPipelineStage, mutations };
};
