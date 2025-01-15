import React from 'react';
import { Snackbar } from '../../../../../components/Snackbar';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { routePipelineRunDetails } from '../../../../../pages/pipeline-details/route';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

export interface CreateDeployPipelineRunProps {
  deployPipelineRun: PipelineRunKubeObjectInterface;
}

export const useCreateDeployPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const deployPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('deployPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE, {
    createCustomMessages: (item) => ({
      onMutate: {
        message: 'Creating deploy PipelineRun',
      },
      onError: {
        message: 'Failed to create deploy PipelineRun',
      },
      onSuccess: {
        message: 'Start deploying application(s)',
        options: {
          autoHideDuration: 8000,
          content: (key, message) => (
            <Snackbar
              text={String(message)}
              snackbarKey={key}
              pushLocation={{
                href: {
                  routeName: routePipelineRunDetails.path,
                  params: {
                    namespace: item.metadata.namespace || getDefaultNamespace(),
                    name: item.metadata.name,
                  },
                },
                text: 'Check status',
              }}
              variant={'success'}
            />
          ),
        },
      },
    }),
  });

  const createDeployPipelineRun = React.useCallback(
    async ({ deployPipelineRun }: CreateDeployPipelineRunProps) => {
      deployPipelineRunCreateMutation.mutate(deployPipelineRun, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [deployPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    deployPipelineRunCreateMutation,
  };

  return { createDeployPipelineRun, mutations };
};
