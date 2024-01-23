import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_LIST } from '../requestKeys';
import { EDPCDPipelineKubeObjectInterface } from '../types';

interface UseCDPipelineListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCDPipelineListQuery = <
  ReturnType = KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>
>({
  props,
  options,
}: UseCDPipelineListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_CD_PIPELINE_LIST,
    () => EDPCDPipelineKubeObject.getList(namespace),
    options
  );
};
