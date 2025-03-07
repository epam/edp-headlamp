import React from 'react';
import { UseQueryOptions } from 'react-query';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPipelineKubeObjectInterface } from '../../CDPipeline/types';
import { CodebaseImageStreamKubeObject } from '../../CodebaseImageStream';
import { CodebaseImageStreamKubeObjectInterface } from '../../CodebaseImageStream/types';
import { CodebaseKubeObjectInterface } from '../types';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

export interface EnrichedApplicationWithItsImageStreams {
  application: CodebaseKubeObjectInterface;
  applicationImageStream: CodebaseImageStreamKubeObjectInterface;
  applicationImageStreams: CodebaseImageStreamKubeObjectInterface[];
  toPromote: boolean;
}

interface UseEnrichedApplicationsWithImageStreamsQueryProps {
  props: {
    CDPipelineData: CDPipelineKubeObjectInterface;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error,
    EnrichedApplicationWithItsImageStreams[]
  >;
}

export const useEnrichedApplicationsWithImageStreamsQuery = ({
  props,
  options,
}: UseEnrichedApplicationsWithImageStreamsQueryProps) => {
  const { CDPipelineData } = props;

  const CDPipelineApplicationListSet = new Set<string>(CDPipelineData?.spec.applications);
  const CDPipelineApplicationToPromoteListSet = new Set<string>(
    CDPipelineData?.spec.applicationsToPromote
  );

  const normalizedInputDockerStreamNames = React.useMemo(
    () => CDPipelineData?.spec.inputDockerStreams.map((el) => el.replaceAll('.', '-')),
    [CDPipelineData?.spec.inputDockerStreams]
  );

  const CDPipelineInputDockerStreamsSet = React.useMemo(
    () => new Set<string>(normalizedInputDockerStreamNames),
    [normalizedInputDockerStreamNames]
  );

  const [codebaseImageStreams] = CodebaseImageStreamKubeObject.useList({
    namespace: CDPipelineData?.metadata.namespace || getDefaultNamespace(),
  });

  return useCodebasesByTypeLabelQuery<EnrichedApplicationWithItsImageStreams[]>({
    props: {
      namespace: CDPipelineData?.metadata.namespace,
      codebaseType: CODEBASE_TYPE.APPLICATION,
    },
    options: {
      enabled: !!codebaseImageStreams,
      cacheTime: 0,
      select: (data) => {
        return data?.items
          .map((el) => {
            const {
              metadata: { name },
            } = el;

            if (!CDPipelineApplicationListSet.has(name)) {
              return;
            }

            const codebaseImageStreamsByCodebaseName = codebaseImageStreams?.filter(
              ({ spec: { codebase } }) => codebase === name
            );

            const applicationImageStream =
              codebaseImageStreamsByCodebaseName &&
              codebaseImageStreamsByCodebaseName.find((el) =>
                CDPipelineInputDockerStreamsSet.has(el.metadata.name)
              );

            return {
              application: el,
              applicationImageStream,
              applicationImageStreams: codebaseImageStreamsByCodebaseName,
              toPromote: CDPipelineApplicationToPromoteListSet.has(name),
            };
          })
          .filter(Boolean);
      },
      ...options,
    },
  });
};
