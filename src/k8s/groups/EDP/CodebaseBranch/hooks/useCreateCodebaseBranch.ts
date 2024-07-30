import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { CodebaseBranchKubeObject } from '../index';
import { CodebaseBranchKubeObjectInterface } from '../types';

interface CreateCodebaseBranchProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  defaultCodebaseBranchData?: CodebaseBranchKubeObjectInterface;
}

export const useCreateCodebaseBranch = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
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

          invokeOnSuccessCallback();
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

  const mutations = {
    codebaseBranchCreateMutation,
    codebaseBranchEditMutation,
  };

  return { createCodebaseBranch, mutations };
};
