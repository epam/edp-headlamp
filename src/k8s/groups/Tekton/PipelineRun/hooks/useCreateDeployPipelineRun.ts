import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

export interface CreateDeployPipelineRunProps {
  deployPipelineRun: PipelineRunKubeObjectInterface;
}

export const useCreateDeployPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const deployPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('deployPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE, {
    customMessages: {
      onMutate: 'Creating deploy PipelineRun',
      onError: 'Failed to create deploy PipelineRun',
      onSuccess: 'Start deploying application(s)',
    },
  });

  const createDeployPipelineRun = React.useCallback(
    async ({ deployPipelineRun }: CreateDeployPipelineRunProps) => {
      deployPipelineRunCreateMutation.mutate(deployPipelineRun, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [deployPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    deployPipelineRunCreateMutation,
  };

  return { createDeployPipelineRun, mutations };
};
