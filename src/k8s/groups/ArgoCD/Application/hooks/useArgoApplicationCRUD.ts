import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { ApplicationKubeObject } from '../index';
import { ApplicationKubeObjectInterface } from '../types';

interface DeleteArgoApplicationProps {
  argoApplication: ApplicationKubeObjectInterface;
}

interface EditArgoApplicationProps {
  argoApplication: ApplicationKubeObjectInterface;
}

interface CreateArgoApplicationProps {
  argoApplication: ApplicationKubeObjectInterface;
}

export const useArgoApplicationCRUD = () => {
  const argoApplicationCreateMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('argoApplicationCreateMutation', ApplicationKubeObject, CRUD_TYPES.CREATE, {
    customMessages: {
      onMutate: 'Creating application...',
      onError: 'Failed to create application',
      onSuccess: 'Start creating application',
    },
  });

  const argoApplicationDeleteMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('argoApplicationDeleteMutation', ApplicationKubeObject, CRUD_TYPES.DELETE, {
    customMessages: {
      onMutate: 'Uninstalling application...',
      onError: 'Failed to uninstall application',
      onSuccess: 'Start uninstalling application',
    },
  });

  const argoApplicationEditMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('argoApplicationEditMutation', ApplicationKubeObject, CRUD_TYPES.EDIT, {
    customMessages: {
      onMutate: 'Updating application...',
      onError: 'Failed to update application',
      onSuccess: 'Start updating application',
    },
  });

  const createArgoApplication = React.useCallback(
    async ({ argoApplication }: CreateArgoApplicationProps): Promise<void> => {
      argoApplicationCreateMutation.mutate(argoApplication);
    },
    [argoApplicationCreateMutation]
  );

  const deleteArgoApplication = React.useCallback(
    async ({ argoApplication }: DeleteArgoApplicationProps): Promise<void> => {
      argoApplicationDeleteMutation.mutate(argoApplication);
    },
    [argoApplicationDeleteMutation]
  );

  const editArgoApplication = React.useCallback(
    async ({ argoApplication }: EditArgoApplicationProps): Promise<void> => {
      argoApplicationEditMutation.mutate(argoApplication);
    },
    [argoApplicationEditMutation]
  );

  const mutations = {
    argoApplicationCreateMutation,
    argoApplicationEditMutation,
    argoApplicationDeleteMutation,
  };

  return { createArgoApplication, editArgoApplication, deleteArgoApplication, mutations };
};
