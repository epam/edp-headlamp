import React from 'react';
import { CDPipelineKubeObject } from '../../../../../k8s/groups/EDP/CDPipeline';
import { EDP_CDPIPELINE_STATUS } from '../../../../../k8s/groups/EDP/CDPipeline/constants';

interface GraphData {
  total: number;
  ok: number;
  error: number;
  inProgress: number;
  unknown: number;
}

export const useCDPipelinesGraphData = () => {
  const [CDPipelines, CDPipelinesError] = CDPipelineKubeObject.useList();
  const isLoading = CDPipelines === null && !CDPipelinesError;

  const graphData = React.useMemo(() => {
    if (isLoading || !CDPipelines) {
      return {
        total: null,
        ok: null,
        error: null,
        inProgress: null,
        unknown: null,
      };
    }

    return CDPipelines.reduce<GraphData>(
      (acc, cur) => {
        const status = cur?.status?.status;

        switch (status) {
          case EDP_CDPIPELINE_STATUS.CREATED:
            acc.ok++;
            break;
          case EDP_CDPIPELINE_STATUS.INITIALIZED:
            acc.inProgress++;
            break;
          case EDP_CDPIPELINE_STATUS.IN_PROGRESS:
            acc.inProgress++;
            break;
          case EDP_CDPIPELINE_STATUS.FAILED:
            acc.error++;
            break;
          default:
            acc.unknown++;
            break;
        }

        acc.total++;

        return acc;
      },
      {
        total: 0,
        ok: 0,
        error: 0,
        inProgress: 0,
        unknown: 0,
      }
    );
  }, [CDPipelines, isLoading]);

  return {
    graphData,
    isLoading,
    error: CDPipelinesError,
  };
};
