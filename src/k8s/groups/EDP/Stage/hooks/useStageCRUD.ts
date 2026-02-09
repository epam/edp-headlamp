import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { StageKubeObject } from '..';
import { StageKubeObjectInterface } from '../types';

interface CreateStageProps {
  stageData: StageKubeObjectInterface;
}

interface EditStageProps {
  stageData: StageKubeObjectInterface;
}

export const useStageCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (stageData: StageKubeObjectInterface) => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(
    (stageData: StageKubeObjectInterface) => {
      onSuccess && onSuccess(stageData);
    },
    [onSuccess]
  );
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const stageCreateMutation = useResourceCRUDMutation<
    StageKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('stageCreateMutation', StageKubeObject, CRUD_TYPE.CREATE);

  const stageEditMutation = useResourceCRUDMutation<
    StageKubeObjectInterface,
    typeof CRUD_TYPE.EDIT
  >('stageEditMutation', StageKubeObject, CRUD_TYPE.EDIT);

  const createStage = React.useCallback(
    async ({ stageData }: CreateStageProps) => {
      stageCreateMutation.mutate(stageData, {
        onSuccess: () => {
          invokeOnSuccessCallback(stageData);
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
      return;
    },
    [stageCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const editStage = React.useCallback(
    async ({ stageData }: EditStageProps) => {
      stageEditMutation.mutate(stageData, {
        onSuccess: () => {
          invokeOnSuccessCallback(stageData);
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [stageEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    stageCreateMutation,
    stageEditMutation,
  };

  return { createStage, editStage, mutations };
};
