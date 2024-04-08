import React from 'react';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON, PIPELINE_RUN_STATUS } from '../../../../../k8s/PipelineRun/constants';

interface GraphData {
  total: number;
  ok: number;
  error: number;
  inProgress: number;
  unknown: number;
  suspended: number;
}

export const usePipelineRunsGraphData = () => {
  const [pipelineRuns, pipelineRunsError] = PipelineRunKubeObject.useList();
  const isLoading = pipelineRuns === null && !pipelineRunsError;

  const graphData = React.useMemo(() => {
    if (isLoading || !pipelineRuns) {
      return {
        total: null,
        ok: null,
        error: null,
        inProgress: null,
        unknown: null,
        suspended: null,
      };
    }

    return pipelineRuns.reduce<GraphData>(
      (acc, cur) => {
        const status = PipelineRunKubeObject.parseStatus(cur);
        const reason = PipelineRunKubeObject.parseStatusReason(cur);

        const _status = status.toLowerCase();
        const _reason = reason.toLowerCase();

        switch (_status) {
          case PIPELINE_RUN_STATUS.UNKNOWN:
            if (
              _reason === PIPELINE_RUN_REASON.STARTED ||
              _reason === PIPELINE_RUN_REASON.RUNNING
            ) {
              acc.inProgress++;
            }

            if (_reason === PIPELINE_RUN_REASON.CANCELLED) {
              acc.suspended++;
            }
            break;
          case PIPELINE_RUN_STATUS.TRUE:
            acc.ok++;
            break;
          case PIPELINE_RUN_STATUS.FALSE:
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
        suspended: 0,
      }
    );
  }, [pipelineRuns, isLoading]);

  return {
    graphData,
    isLoading,
    error: pipelineRunsError,
  };
};
