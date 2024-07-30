import React from 'react';
import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { useCDPipelineStageListQuery } from '../../Stage/hooks/useCDPipelineStageListQuery';
import { StageKubeObjectInterface } from '../../Stage/types';
import { CDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineByNameQuery } from './useCDPipelineByNameQuery';

interface UseCDPipelineByAutotestItUsesInItsStagesQueryProps {
  props: {
    codebaseName: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<StageKubeObjectInterface>,
    Error,
    CDPipelineKubeObjectInterface
  >;
}

export const useCDPipelineByAutotestItUsesInItsStagesQuery = ({
  props,
  options,
}: UseCDPipelineByAutotestItUsesInItsStagesQueryProps) => {
  const { codebaseName } = props;

  const [CDPipelineName, setCDPipelineName] = React.useState<string>(null);
  const query = useCDPipelineByNameQuery({
    props: {
      name: CDPipelineName,
    },
    options: {
      enabled: !!CDPipelineName,
    },
  });

  useCDPipelineStageListQuery<CDPipelineKubeObjectInterface>({
    options: {
      onSuccess: async (data) => {
        for (const {
          spec: { qualityGates, cdPipeline },
        } of data?.items) {
          for (const { autotestName } of qualityGates) {
            if (autotestName === codebaseName) {
              setCDPipelineName(cdPipeline);
            }
          }
        }
      },
      ...options,
      enabled: options?.enabled && !!codebaseName,
    },
  });

  return React.useMemo(() => query, [query]);
};
