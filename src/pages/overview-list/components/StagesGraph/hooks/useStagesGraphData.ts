import React from 'react';
import { StageKubeObject } from '../../../../../k8s/groups/EDP/Stage';
import { EDP_CDPIPELINE_STAGE_STATUS } from '../../../../../k8s/groups/EDP/Stage/constants';

interface GraphData {
  total: number;
  ok: number;
  error: number;
  inProgress: number;
  unknown: number;
}

export const useStagesGraphData = () => {
  const [stages, stagesError] = StageKubeObject.useList();
  const isLoading = stages === null && !stagesError;

  const graphData = React.useMemo(() => {
    if (isLoading || !stages) {
      return {
        total: null,
        ok: null,
        error: null,
        inProgress: null,
        unknown: null,
      };
    }

    return stages.reduce<GraphData>(
      (acc, cur) => {
        const status = cur?.status?.status;

        switch (status) {
          case EDP_CDPIPELINE_STAGE_STATUS.CREATED:
            acc.ok++;
            break;
          case EDP_CDPIPELINE_STAGE_STATUS.INITIALIZED:
            acc.inProgress++;
            break;
          case EDP_CDPIPELINE_STAGE_STATUS.IN_PROGRESS:
            acc.inProgress++;
            break;
          case EDP_CDPIPELINE_STAGE_STATUS.FAILED:
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
  }, [stages, isLoading]);

  return {
    graphData,
    isLoading,
    error: stagesError,
  };
};
