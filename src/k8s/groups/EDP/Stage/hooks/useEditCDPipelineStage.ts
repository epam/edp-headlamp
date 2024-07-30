import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { StageKubeObject } from '../index';
import { StageKubeObjectInterface } from '../types';

interface EditCDPipelineStageProps {
  CDPipelineStageData: StageKubeObjectInterface;
}

export const useEditCDPipelineStage = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const CDPipelineStageEditMutation = useResourceCRUDMutation<
    StageKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('CDPipelineStageEditMutation', StageKubeObject, CRUD_TYPES.EDIT);

  const editCDPipelineStage = React.useCallback(
    async ({ CDPipelineStageData }: EditCDPipelineStageProps) => {
      CDPipelineStageEditMutation.mutate(CDPipelineStageData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [CDPipelineStageEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    CDPipelineStageEditMutation,
  };

  return { editCDPipelineStage, mutations };
};
