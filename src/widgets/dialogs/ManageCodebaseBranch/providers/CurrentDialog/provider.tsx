import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { PIPELINE_TYPES } from '../../../../../constants/pipelineTypes';
import { usePipelineByTypeListQuery } from '../../../../../k8s/groups/Tekton/Pipeline/hooks/usePipelineByTypeListQuery';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const {
    data: buildPipelines,
    error: buildPipelinesError,
    isLoading: buildPipelinesIsLoading,
  } = usePipelineByTypeListQuery({
    props: {
      pipelineType: PIPELINE_TYPES.BUILD,
    },
  });

  const {
    data: reviewPipelines,
    error: reviewPipelinesError,
    isLoading: reviewPipelinesIsLoading,
  } = usePipelineByTypeListQuery({
    props: {
      pipelineType: PIPELINE_TYPES.REVIEW,
    },
  });

  const CurrentDialogContextValue = React.useMemo(
    () => ({
      props,
      state,
      extra: {
        buildPipelines: {
          data: buildPipelines,
          error: buildPipelinesError as ApiError,
          isLoading: buildPipelinesIsLoading,
        },
        reviewPipelines: {
          data: reviewPipelines,
          error: reviewPipelinesError as ApiError,
          isLoading: reviewPipelinesIsLoading,
        },
      },
    }),
    [
      props,
      state,
      buildPipelines,
      buildPipelinesError,
      buildPipelinesIsLoading,
      reviewPipelines,
      reviewPipelinesError,
      reviewPipelinesIsLoading,
    ]
  );

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      {children}
    </CurrentDialogContext.Provider>
  );
};
