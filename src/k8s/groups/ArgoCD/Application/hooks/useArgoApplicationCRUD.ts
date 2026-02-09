import React from 'react';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
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
    typeof CRUD_TYPE.CREATE
  >('argoApplicationCreateMutation', ApplicationKubeObject, CRUD_TYPE.CREATE, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Creating application...',
      },
      onError: {
        message: 'Failed to create application',
      },
      onSuccess: {
        message: 'Start creating application',
      },
    }),
  });

  const argoApplicationDeleteMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    typeof CRUD_TYPE.DELETE
  >('argoApplicationDeleteMutation', ApplicationKubeObject, CRUD_TYPE.DELETE, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Uninstalling application...',
      },
      onError: {
        message: 'Failed to uninstall application',
      },
      onSuccess: {
        message: 'Start uninstalling application',
      },
    }),
  });

  const argoApplicationEditMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    typeof CRUD_TYPE.EDIT
  >('argoApplicationEditMutation', ApplicationKubeObject, CRUD_TYPE.EDIT, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Updating application...',
      },
      onError: {
        message: 'Failed to update application',
      },
      onSuccess: {
        message: 'Start updating application',
      },
    }),
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
