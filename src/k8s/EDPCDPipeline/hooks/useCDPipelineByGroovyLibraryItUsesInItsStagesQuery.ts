import React from 'react';
import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { useCDPipelineStageListQuery } from '../../EDPCDPipelineStage/hooks/useCDPipelineStageListQuery';
import { EDPCDPipelineStageKubeObjectInterface } from '../../EDPCDPipelineStage/types';
import { EDPCDPipelineKubeObjectInterface } from '../types';
import { useCDPipelineByNameQuery } from './useCDPipelineByNameQuery';

interface UseCDPipelineByGroovyLibraryItUsesInItsStagesQueryProps {
  props: {
    codebaseName: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
    Error,
    EDPCDPipelineKubeObjectInterface
  >;
}

export const useCDPipelineByGroovyLibraryItUsesInItsStagesQuery = ({
  props,
  options,
}: UseCDPipelineByGroovyLibraryItUsesInItsStagesQueryProps) => {
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
          spec: {
            source: {
              library: { name },
            },
            cdPipeline,
          },
        } of data?.items) {
          if (name === codebaseName) {
            setCDPipelineName(cdPipeline);
          }
        }
      },
      ...options,
      enabled: options?.enabled && !!codebaseName,
    },
  });

  return React.useMemo(() => query, [query]);
};
