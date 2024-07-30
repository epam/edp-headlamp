import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { StageKubeObject } from '../../Stage';
import { StageKubeObjectInterface } from '../../Stage/types';
import { CDPipelineKubeObject } from '../index';
import { CDPipelineKubeObjectInterface } from '../types';

interface CreateCDPipelineProps {
  CDPipelineData: CDPipelineKubeObjectInterface;
  onSuccess: (CDPipelineData: CDPipelineKubeObjectInterface) => void;
}

export const useCreateCDPipeline = () => {
  const CDPipelineCreateMutation = useResourceCRUDMutation<
    CDPipelineKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineCreateMutation', CDPipelineKubeObject, CRUD_TYPES.CREATE);

  const CDPipelineDeleteMutation = useResourceCRUDMutation<
    CDPipelineKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('CDPipelineDeleteMutation', CDPipelineKubeObject, CRUD_TYPES.DELETE);

  const CDPipelineStageCreateMutation = useResourceCRUDMutation<
    StageKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineStageCreateMutation', StageKubeObject, CRUD_TYPES.CREATE);

  const CDPipelineStageDeleteMutation = useResourceCRUDMutation<
    StageKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('CDPipelineStageDeleteMutation', StageKubeObject, CRUD_TYPES.DELETE);

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
    CDPipelineDeleteMutation,
    CDPipelineStageCreateMutation,
    CDPipelineStageDeleteMutation,
  };

  return { createCDPipeline, mutations };
};
