import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
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
    CRUD_TYPE.CREATE
  >('CDPipelineCreateMutation', CDPipelineKubeObject, CRUD_TYPE.CREATE);

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
