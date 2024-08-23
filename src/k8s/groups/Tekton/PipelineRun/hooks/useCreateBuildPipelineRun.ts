import React, { useCallback } from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { CodebaseKubeObjectInterface } from '../../../EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../EDP/CodebaseBranch/types';
import { GitServerKubeObjectInterface } from '../../../EDP/GitServer/types';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';
import { createBuildPipelineRunInstance } from '../utils/createBuildPipelineRunInstance';

export interface CreateBuildPipelineRunProps {
  namespace: string;
  codebase: CodebaseKubeObjectInterface;
  codebaseBranch: CodebaseBranchKubeObjectInterface;
  gitServer: GitServerKubeObjectInterface;
  storageSize: string;
}

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
  >('buildPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE);

  const createBuildPipelineRun = React.useCallback(
    async (data: CreateBuildPipelineRunProps) => {
      const buildPipelineRunData = createBuildPipelineRunInstance(data);
      buildPipelineRunCreateMutation.mutate(buildPipelineRunData, {
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
