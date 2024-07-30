import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_LIST } from '../requestKeys';
import { CDPipelineKubeObjectInterface } from '../types';

interface UseCDPipelineListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<CDPipelineKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCDPipelineListQuery = <
  ReturnType = KubeObjectListInterface<CDPipelineKubeObjectInterface>
>({
  props,
  options,
}: UseCDPipelineListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<CDPipelineKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_CD_PIPELINE_LIST,
    () => CDPipelineKubeObject.getList(namespace),
    options
  );
};
