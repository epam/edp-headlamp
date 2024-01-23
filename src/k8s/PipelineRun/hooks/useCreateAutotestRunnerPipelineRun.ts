import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';
import { createAutotestRunnerPipelineRunInstance } from '../utils/createAutotestRunnerPipelineRunInstance';

export interface CreateAutotestRunnerPipelineRunProps {
  namespace: string;
  stageSpecName: string;
  CDPipelineName: string;
  storageSize: string;
}

export const useCreateAutotestRunnerPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const autotestRunnerPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('autotestRunnerPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE);

  const createAutotestRunnerPipelineRun = React.useCallback(
    async (data: CreateAutotestRunnerPipelineRunProps) => {
      const deployPipelineRunData = createAutotestRunnerPipelineRunInstance(data);
      autotestRunnerPipelineRunCreateMutation.mutate(deployPipelineRunData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [autotestRunnerPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    autotestRunnerPipelineRunCreateMutation,
  };

  return { createAutotestRunnerPipelineRun, mutations };
};
