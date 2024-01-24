import React from 'react';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDP_CODEBASE_STATUS } from '../../../../../k8s/EDPCodebase/constants';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';

export const useCodebasesGraphData = () => {
  const [codebasesInfo, setCodebasesInfo] = React.useState<{
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
  EDPCodebaseKubeObject.useApiList(
    (codebases: EDPCodebaseKubeObjectInterface[]) => {
      const newCodebasesInfo = {
        green: 0,
        red: 0,
        total: 0,
        blue: 0,
        grey: 0,
      };

      for (const item of codebases) {
        const status = item?.status?.status;

        switch (status) {
          case EDP_CODEBASE_STATUS.CREATED:
            newCodebasesInfo.green++;
            break;
          case EDP_CODEBASE_STATUS.INITIALIZED:
            newCodebasesInfo.blue++;
            break;
          case EDP_CODEBASE_STATUS.IN_PROGRESS:
            newCodebasesInfo.blue++;
            break;
          case EDP_CODEBASE_STATUS.FAILED:
            newCodebasesInfo.red++;
            break;
          default:
            newCodebasesInfo.grey++;
            break;
        }
        newCodebasesInfo.total++;
      }

      setCodebasesInfo(newCodebasesInfo);
    },
    (error) => setError(error),
    {
      namespace: getDefaultNamespace(),
    }
  );

  return codebasesInfo;
};
