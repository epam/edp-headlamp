import { useQuery, UseQueryOptions } from 'react-query';
import { PIPELINE_TYPE } from '../../../../../constants/pipelineTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_PIPELINE_LIST_BY_TYPE } from '../requestKeys';
import { PipelineKubeObjectInterface } from '../types';

interface UsePipelineByTypeListQueryProps<ReturnType> {
  props: {
    pipelineType: PIPELINE_TYPE;
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<PipelineKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const usePipelineByTypeListQuery = <
  ReturnType = KubeObjectListInterface<PipelineKubeObjectInterface>
>({
  props,
  options,
}: UsePipelineByTypeListQueryProps<ReturnType>) => {
  const { pipelineType } = props;
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<PipelineKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_PIPELINE_LIST_BY_TYPE, pipelineType],
    () => PipelineKubeObject.getListByPipelineType(namespace, pipelineType),
    options
  );
};
