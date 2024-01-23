import React from 'react';
import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { useCDPipelineStageListQuery } from '../../EDPCDPipelineStage/hooks/useCDPipelineStageListQuery';
import { EDPCDPipelineStageKubeObjectInterface } from '../../EDPCDPipelineStage/types';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineByNameQuery } from './useCDPipelineByNameQuery';

interface UseCDPipelineByAutotestItUsesInItsStagesQueryProps {
  props: {
    codebaseName: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
    Error,
    EDPCDPipelineKubeObjectInterface
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

  useCDPipelineStageListQuery<EDPCDPipelineKubeObjectInterface>({
    options: {
      onSuccess: async data => {
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
