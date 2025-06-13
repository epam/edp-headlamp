import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { PIPELINE_TYPE } from '../../../../../constants/pipelineTypes';
import { useEDPConfigMapQuery } from '../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { usePipelineByTypeListQuery } from '../../../../../k8s/groups/Tekton/Pipeline/hooks/usePipelineByTypeListQuery';
import { ApiServiceBase, GitFusionApiService } from '../../../../../services/api';
import { getToken } from '../../../../../utils/getToken';
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
  } = usePipelineByTypeListQuery(PIPELINE_TYPE.BUILD);

  const {
    data: reviewPipelines,
    error: reviewPipelinesError,
    isLoading: reviewPipelinesIsLoading,
  } = usePipelineByTypeListQuery(PIPELINE_TYPE.REVIEW);

  const cluster = Utils.getCluster() || '';
  const token = getToken(cluster);
  const { data: EDPConfigMap } = useEDPConfigMapQuery();

  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const CurrentDialogContextValue = React.useMemo(() => {
    const apiServiceBase = new ApiServiceBase(apiGatewayUrl, token);

    const gitFusionApiService = new GitFusionApiService(apiServiceBase);

    return {
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
        apiServiceBase,
        gitFusionApiService,
      },
    };
  }, [
    apiGatewayUrl,
    token,
    props,
    state,
    buildPipelines,
    buildPipelinesError,
    buildPipelinesIsLoading,
    reviewPipelines,
    reviewPipelinesError,
    reviewPipelinesIsLoading,
  ]);

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      {children}
    </CurrentDialogContext.Provider>
  );
};
