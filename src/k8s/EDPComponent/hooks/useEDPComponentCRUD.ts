import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { EDPComponentKubeObject } from '../index';
import { EDPComponentKubeObjectInterface } from '../types';

interface CreateEDPComponentProps {
  EDPComponentData: EDPComponentKubeObjectInterface;
}

interface EditEDPComponentProps {
  EDPComponentData: EDPComponentKubeObjectInterface;
}

export const useEDPComponentCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const EDPComponentCreateMutation = useResourceCRUDMutation<
    EDPComponentKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('EDPComponentCreateMutation', EDPComponentKubeObject, CRUD_TYPES.CREATE);

  const EDPComponentEditMutation = useResourceCRUDMutation<
    EDPComponentKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('EDPComponentEditMutation', EDPComponentKubeObject, CRUD_TYPES.EDIT);

  const createEDPComponent = React.useCallback(
    async ({ EDPComponentData }: CreateEDPComponentProps) => {
      EDPComponentCreateMutation.mutate(EDPComponentData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [EDPComponentCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const editEDPComponent = React.useCallback(
    async ({ EDPComponentData }: EditEDPComponentProps) => {
      EDPComponentEditMutation.mutate(EDPComponentData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [EDPComponentEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    EDPComponentCreateMutation,
    EDPComponentEditMutation,
  };

  return { createEDPComponent, editEDPComponent, mutations };
};
