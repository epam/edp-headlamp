import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { StageKubeObject } from '../index';
import { StageKubeObjectInterface } from '../types';

interface CreateCDPipelineStageProps {
  CDPipelineStageData: StageKubeObjectInterface;
}

export const useCreateCDPipelineStage = ({
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

  const CDPipelineStageCreateMutation = useResourceCRUDMutation<
    StageKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineStageCreateMutation', StageKubeObject, CRUD_TYPES.CREATE);

  const createCDPipelineStage = React.useCallback(
    async ({ CDPipelineStageData }: CreateCDPipelineStageProps) => {
      CDPipelineStageCreateMutation.mutate(CDPipelineStageData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
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
