import React from 'react';
import { useQuery } from 'react-query';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPipelineKubeObjectInterface } from '../../CDPipeline/types';
import { CodebaseImageStreamKubeObject } from '../../CodebaseImageStream';
import { CodebaseImageStreamKubeObjectInterface } from '../../CodebaseImageStream/types';
import { CodebaseKubeObject } from '..';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

export interface EnrichedApplicationWithItsImageStreams {
  application: CodebaseKubeObjectInterface;
  applicationImageStream: CodebaseImageStreamKubeObjectInterface | undefined;
  applicationImageStreams: CodebaseImageStreamKubeObjectInterface[];
  toPromote: boolean;
}

export const useEnrichedApplicationsWithImageStreamsQuery = (
  CDPipelineData: CDPipelineKubeObjectInterface | undefined
) => {
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

  const _codebaseImageStreams = codebaseImageStreams as CodebaseImageStreamKubeObjectInterface[];

  return useQuery<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error,
    EnrichedApplicationWithItsImageStreams[]
  >(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, CODEBASE_TYPE.APPLICATION],
    () =>
      CodebaseKubeObject.getListByTypeLabel(
        CDPipelineData?.metadata.namespace!,
        CODEBASE_TYPE.APPLICATION
      ),
    {
      enabled: !!CDPipelineData && !!_codebaseImageStreams,
      cacheTime: 0,
      select: (data) => {
        return data.items.reduce<EnrichedApplicationWithItsImageStreams[]>((acc, cur) => {
          const {
            metadata: { name },
          } = cur;

          if (!CDPipelineApplicationListSet.has(name)) {
            return acc;
          }

          const codebaseImageStreamsByCodebaseName = _codebaseImageStreams?.filter(
            ({ spec: { codebase } }) => codebase === name
          );

          const applicationImageStream =
            codebaseImageStreamsByCodebaseName &&
            codebaseImageStreamsByCodebaseName.find((el) =>
              CDPipelineInputDockerStreamsSet.has(el.metadata.name)
            );

          acc.push({
            application: cur,
            applicationImageStream,
            applicationImageStreams: codebaseImageStreamsByCodebaseName,
            toPromote: CDPipelineApplicationToPromoteListSet.has(name),
          });

          return acc;
        }, []);
      },
    }
  );
};
