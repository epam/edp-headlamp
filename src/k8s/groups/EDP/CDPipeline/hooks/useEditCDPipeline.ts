import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { CDPipelineKubeObject } from '../index';
import { CDPipelineKubeObjectInterface } from '../types';

interface EditCDPipelineProps {
  CDPipelineData: CDPipelineKubeObjectInterface;
}

export const useEditCDPipeline = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const CDPipelineEditMutation = useResourceCRUDMutation<
    CDPipelineKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('CDPipelineEditMutation', CDPipelineKubeObject, CRUD_TYPES.EDIT);

  const editCDPipeline = React.useCallback(
    async ({ CDPipelineData }: EditCDPipelineProps) => {
      CDPipelineEditMutation.mutate(CDPipelineData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [CDPipelineEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    CDPipelineEditMutation,
  };

  return { editCDPipeline, mutations };
};
