import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { CDPipelineKubeObject } from '../index';
import { CDPipelineKubeObjectInterface } from '../types';

interface CreateCDPipelineProps {
  CDPipelineData: CDPipelineKubeObjectInterface;
  onSuccess: (CDPipelineData: CDPipelineKubeObjectInterface) => void;
}

export const useCDPipelineCRUD = () => {
  const CDPipelineCreateMutation = useResourceCRUDMutation<
    CDPipelineKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineCreateMutation', CDPipelineKubeObject, CRUD_TYPES.CREATE);

  const createCDPipeline = React.useCallback(
    async ({ CDPipelineData, onSuccess }: CreateCDPipelineProps) => {
      CDPipelineCreateMutation.mutate(CDPipelineData, {
        onSuccess: () => {
          onSuccess(CDPipelineData);
        },
      });
    },
    [CDPipelineCreateMutation]
  );

  const mutations = {
    CDPipelineCreateMutation,
  };

  return { createCDPipeline, mutations };
};
