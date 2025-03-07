import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { QuickLinkKubeObject } from '../index';
import { QuickLinkKubeObjectInterface } from '../types';

interface CreateQuickLinkProps {
  QuickLinkData: QuickLinkKubeObjectInterface;
}

interface EditQuickLinkProps {
  QuickLinkData: QuickLinkKubeObjectInterface;
}

export const useQuickLinkCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const QuickLinkCreateMutation = useResourceCRUDMutation<
    QuickLinkKubeObjectInterface,
    CRUD_TYPE.CREATE
  >('QuickLinkCreateMutation', QuickLinkKubeObject, CRUD_TYPE.CREATE);

  const QuickLinkEditMutation = useResourceCRUDMutation<
    QuickLinkKubeObjectInterface,
    CRUD_TYPE.EDIT
  >('QuickLinkEditMutation', QuickLinkKubeObject, CRUD_TYPE.EDIT);

  const createQuickLink = React.useCallback(
    async ({ QuickLinkData }: CreateQuickLinkProps) => {
      QuickLinkCreateMutation.mutate(QuickLinkData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [QuickLinkCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const editQuickLink = React.useCallback(
    async ({ QuickLinkData }: EditQuickLinkProps) => {
      QuickLinkEditMutation.mutate(QuickLinkData, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [QuickLinkEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    QuickLinkCreateMutation,
    QuickLinkEditMutation,
  };

  return { createQuickLink, editQuickLink, mutations };
};
