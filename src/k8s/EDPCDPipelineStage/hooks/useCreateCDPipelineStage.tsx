import { Router } from '@kinvolk/headlamp-plugin/lib';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Snackbar } from '../../../components/Snackbar';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
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
  const { enqueueSnackbar } = useSnackbar();

  const invokeOnSuccessCallback = React.useCallback(
    (CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface) => {
      onSuccess && onSuccess();

      const CDPipelineStageRoute = Router.createRouteURL(routeEDPStageDetails.path, {
        CDPipelineName: CDPipelineStageData.spec.cdPipeline,
        namespace: CDPipelineStageData.metadata.namespace || getDefaultNamespace(),
        stageName: CDPipelineStageData.metadata.name,
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
            link={CDPipelineStageRoute}
            variant="success"
          />
        ),
      });
    },
    [enqueueSnackbar, onSuccess]
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
