import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { EDPCDPipelineStageKubeObject } from '../../EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../EDPCDPipelineStage/types';
import { EDPCDPipelineKubeObject } from '../index';
import { EDPCDPipelineKubeObjectInterface } from '../types';

interface CreateCDPipelineProps {
  CDPipelineData: EDPCDPipelineKubeObjectInterface;
  onSuccess: (CDPipelineData: EDPCDPipelineKubeObjectInterface) => void;
}

export const useCreateCDPipeline = () => {
  const CDPipelineCreateMutation = useResourceCRUDMutation<
    EDPCDPipelineKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineCreateMutation', EDPCDPipelineKubeObject, CRUD_TYPES.CREATE);

  const CDPipelineDeleteMutation = useResourceCRUDMutation<
    EDPCDPipelineKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('CDPipelineDeleteMutation', EDPCDPipelineKubeObject, CRUD_TYPES.DELETE);

  const CDPipelineStageCreateMutation = useResourceCRUDMutation<
    EDPCDPipelineStageKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('CDPipelineStageCreateMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.CREATE);

  const CDPipelineStageDeleteMutation = useResourceCRUDMutation<
    EDPCDPipelineStageKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('CDPipelineStageDeleteMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.DELETE);

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
