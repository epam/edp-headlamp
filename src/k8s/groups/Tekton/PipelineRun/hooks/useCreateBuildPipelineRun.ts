import React, { useCallback } from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

export const useCreateBuildPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

  const buildPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('buildPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Creating build PipelineRun',
      },
      onError: {
        message: 'Failed to create build PipelineRun',
      },
      onSuccess: {
        message: 'Start building application(s)',
      },
    }),
  });

  const createBuildPipelineRun = React.useCallback(
    (data: PipelineRunKubeObjectInterface) => {
      buildPipelineRunCreateMutation.mutate(data, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [buildPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    buildPipelineRunCreateMutation,
  };

  return { createBuildPipelineRun, mutations };
};
