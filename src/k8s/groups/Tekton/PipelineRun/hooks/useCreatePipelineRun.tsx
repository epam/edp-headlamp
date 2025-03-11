import React from 'react';
import { Snackbar } from '../../../../../components/Snackbar';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { routePipelineRunDetails } from '../../../../../pages/pipelines/pages/pipeline-run-details/route';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineRunKubeObject } from '..';
import { PipelineRunKubeObjectInterface } from '../types';

export interface CreatePipelineRunProps {
  pipelineRun: PipelineRunKubeObjectInterface;
}

export const useCreatePipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const pipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('pipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPE.CREATE, {
    createCustomMessages: (item) => ({
      onMutate: {
        message: 'Creating PipelineRun',
      },
      onError: {
        message: 'Failed to create PipelineRun',
      },
      onSuccess: {
        message: 'Created PipelineRun',
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

  const createPipelineRun = React.useCallback(
    async ({ pipelineRun }: CreatePipelineRunProps) => {
      pipelineRunCreateMutation.mutate(pipelineRun, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [pipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    pipelineRunCreateMutation,
  };

  return { createPipelineRun, mutations };
};
