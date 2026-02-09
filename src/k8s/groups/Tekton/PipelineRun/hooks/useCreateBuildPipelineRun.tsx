import React, { useCallback } from 'react';
import { Snackbar } from '../../../../../components/Snackbar';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { routePipelineRunDetails } from '../../../../../pages/pipelines/pages/pipeline-run-details/route';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

export const useCreateBuildPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

  const buildPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('buildPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPE.CREATE, {
    createCustomMessages: (item) => ({
      onMutate: {
        message: 'Creating build PipelineRun',
      },
      onError: {
        message: 'Failed to create build PipelineRun',
      },
      onSuccess: {
        message: 'Start building application(s)',
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

  const createBuildPipelineRun = React.useCallback(
    (data: PipelineRunKubeObjectInterface) => {
      buildPipelineRunCreateMutation.mutate(data, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [buildPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    buildPipelineRunCreateMutation,
  };

  return { createBuildPipelineRun, mutations };
};
