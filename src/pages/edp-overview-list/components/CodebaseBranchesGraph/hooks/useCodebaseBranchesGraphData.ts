import React from 'react';
import { EDPCodebaseBranchKubeObject } from '../../../../../k8s/EDPCodebaseBranch';
import { EDP_CODEBASE_BRANCH_STATUS } from '../../../../../k8s/EDPCodebaseBranch/constants';

interface GraphData {
  total: number;
  ok: number;
  error: number;
  inProgress: number;
  unknown: number;
}

export const useCodebaseBranchesGraphData = () => {
  const [branches, branchesError] = EDPCodebaseBranchKubeObject.useList();
  const isLoading = branches === null && !branchesError;

  const graphData = React.useMemo(() => {
    if (isLoading || !branches) {
      return {
        total: null,
        ok: null,
        error: null,
        inProgress: null,
        unknown: null,
      };
    }

    return branches.reduce<GraphData>(
      (acc, cur) => {
        const status = cur?.status?.status;

        switch (status) {
          case EDP_CODEBASE_BRANCH_STATUS.CREATED:
            acc.ok++;
            break;
          case EDP_CODEBASE_BRANCH_STATUS.INITIALIZED:
            acc.inProgress++;
            break;
          case EDP_CODEBASE_BRANCH_STATUS.IN_PROGRESS:
            acc.inProgress++;
            break;
          case EDP_CODEBASE_BRANCH_STATUS.FAILED:
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
  }, [branches, isLoading]);

  return {
    graphData,
    isLoading,
    error: branchesError,
  };
};
