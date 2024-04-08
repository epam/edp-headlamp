import React from 'react';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDP_CODEBASE_STATUS } from '../../../../../k8s/EDPCodebase/constants';

interface GraphData {
  total: number;
  ok: number;
  error: number;
  inProgress: number;
  unknown: number;
}

export const useCodebasesGraphData = () => {
  const [codebases, codebasesError] = EDPCodebaseKubeObject.useList();
  const isLoading = codebases === null && !codebasesError;

  const graphData = React.useMemo(() => {
    if (isLoading || !codebases) {
      return {
        total: null,
        ok: null,
        error: null,
        inProgress: null,
        unknown: null,
      };
    }

    return codebases.reduce<GraphData>(
      (acc, cur) => {
        const status = cur?.status?.status;

        switch (status) {
          case EDP_CODEBASE_STATUS.CREATED:
            acc.ok++;
            break;
          case EDP_CODEBASE_STATUS.INITIALIZED:
            acc.inProgress++;
            break;
          case EDP_CODEBASE_STATUS.IN_PROGRESS:
            acc.inProgress++;
            break;
          case EDP_CODEBASE_STATUS.FAILED:
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
  }, [codebases, isLoading]);

  return {
    graphData,
    isLoading,
    error: codebasesError,
  };
};
