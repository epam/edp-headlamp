import React from 'react';
import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { StageKubeObject } from '../../Stage';
import { REQUEST_KEY_QUERY_STAGE_LIST } from '../../Stage/requestKeys';
import { StageKubeObjectInterface } from '../../Stage/types';
import { useCDPipelineByNameQuery } from './useCDPipelineByNameQuery';

export const useCDPipelineByAutotestItUsesInItsStagesQuery = (
  codebaseName: string | undefined,
  namespace: string = getDefaultNamespace()
) => {
  const [CDPipelineName, setCDPipelineName] = React.useState<string | null>(null);

  useQuery<KubeObjectListInterface<StageKubeObjectInterface>, Error>(
    REQUEST_KEY_QUERY_STAGE_LIST,
    () => StageKubeObject.getList(namespace),
    {
      onSuccess: (data) => {
        const stage = data?.items.find((item) => {
          return item.spec.qualityGates.some((qualityGate) => {
            return qualityGate.autotestName === codebaseName;
          });
        });

        const cdPipelineName = stage?.spec.cdPipeline;

        if (cdPipelineName) {
          setCDPipelineName(cdPipelineName);
        }
      },
      enabled: !!codebaseName,
    }
  );

  return useCDPipelineByNameQuery(CDPipelineName);
};
