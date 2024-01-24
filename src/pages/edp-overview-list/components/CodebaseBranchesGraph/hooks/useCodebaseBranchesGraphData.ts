import React from 'react';
import { EDPCodebaseBranchKubeObject } from '../../../../../k8s/EDPCodebaseBranch';
import { EDP_CODEBASE_BRANCH_STATUS } from '../../../../../k8s/EDPCodebaseBranch/constants';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';

export const useCodebaseBranchesGraphData = () => {
  const [codebaseBranchesInfo, setCodebaseBranchesInfo] = React.useState<{
    total: number;
    green: number;
    red: number;
    blue: number;
    grey: number;
  }>({
    total: null,
    green: null,
    red: null,
    blue: null,
    grey: null,
  });
  const [, setError] = React.useState<unknown>(null);
  EDPCodebaseBranchKubeObject.useApiList(
    (codebaseBranches: EDPCodebaseBranchKubeObjectInterface[]) => {
      const newCodebaseBranchesInfo = {
        green: 0,
        red: 0,
        total: 0,
        blue: 0,
        grey: 0,
      };

      for (const item of codebaseBranches) {
        const status = item?.status?.status;

        switch (status) {
          case EDP_CODEBASE_BRANCH_STATUS.CREATED:
            newCodebaseBranchesInfo.green++;
            break;
          case EDP_CODEBASE_BRANCH_STATUS.INITIALIZED:
            newCodebaseBranchesInfo.blue++;
            break;
          case EDP_CODEBASE_BRANCH_STATUS.IN_PROGRESS:
            newCodebaseBranchesInfo.blue++;
            break;
          case EDP_CODEBASE_BRANCH_STATUS.FAILED:
            newCodebaseBranchesInfo.red++;
            break;
          default:
            newCodebaseBranchesInfo.grey++;
            break;
        }

        newCodebaseBranchesInfo.total++;
      }

      setCodebaseBranchesInfo(newCodebaseBranchesInfo);
    },
    (error) => setError(error),
    {
      namespace: getDefaultNamespace(),
    }
  );

  return codebaseBranchesInfo;
};
