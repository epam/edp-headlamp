import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { CodebaseBranchKubeObject } from '..';
import { CodebaseBranchKubeObjectInterface } from '../types';

interface CreateCodebaseBranchProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  defaultCodebaseBranchData?: CodebaseBranchKubeObjectInterface;
}

interface EditCodebaseBranchProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
}

export const useCodebaseBranchCRUD = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (codebaseBranchData: CodebaseBranchKubeObjectInterface) => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(
    (codebaseBranchData: CodebaseBranchKubeObjectInterface) => {
      onSuccess && onSuccess(codebaseBranchData);
    },
    [onSuccess]
  );
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const codebaseBranchCreateMutation = useResourceCRUDMutation<
    CodebaseBranchKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('codebaseBranchCreateMutation', CodebaseBranchKubeObject, CRUD_TYPES.CREATE);

  const codebaseBranchEditMutation = useResourceCRUDMutation<
    CodebaseBranchKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codebaseBranchEditMutation', CodebaseBranchKubeObject, CRUD_TYPES.EDIT);

  const createCodebaseBranch = React.useCallback(
    async ({ codebaseBranchData, defaultCodebaseBranchData }: CreateCodebaseBranchProps) => {
      codebaseBranchCreateMutation.mutate(codebaseBranchData, {
        onSuccess: () => {
          if (defaultCodebaseBranchData) {
            codebaseBranchEditMutation.mutate(defaultCodebaseBranchData);
          }

          invokeOnSuccessCallback(codebaseBranchData);
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [
      codebaseBranchCreateMutation,
      codebaseBranchEditMutation,
      invokeOnErrorCallback,
      invokeOnSuccessCallback,
    ]
  );

  const editCodebaseBranch = React.useCallback(
    async ({ codebaseBranchData }: EditCodebaseBranchProps) => {
      codebaseBranchEditMutation.mutate(codebaseBranchData, {
        onSuccess: () => {
          invokeOnSuccessCallback(codebaseBranchData);
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [codebaseBranchEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    codebaseBranchCreateMutation,
    codebaseBranchEditMutation,
  };

  return { createCodebaseBranch, editCodebaseBranch, mutations };
};