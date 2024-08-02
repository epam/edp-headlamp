import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

export interface CreateCleanPipelineRunProps {
  cleanPipelineRun: PipelineRunKubeObjectInterface;
}

export const useCreateCleanPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const cleanPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('cleanPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE, {
    customMessages: {
      onMutate: 'Creating clean PipelineRun',
      onError: 'Failed to create clean PipelineRun',
      onSuccess: 'Start cleaning application(s)',
    },
  });

  const createCleanPipelineRun = React.useCallback(
    async ({ cleanPipelineRun }: CreateCleanPipelineRunProps) => {
      cleanPipelineRunCreateMutation.mutate(cleanPipelineRun, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [cleanPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    cleanPipelineRunCreateMutation,
  };

  return { createCleanPipelineRun, mutations };
};
