import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { StageKubeObject } from '../index';
import { REQUEST_KEY_QUERY_STAGE_LIST } from '../requestKeys';
import { StageKubeObjectInterface } from '../types';

interface UseCDPipelineStageListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<KubeObjectListInterface<StageKubeObjectInterface>, Error, ReturnType>;
}

export const useCDPipelineStageListQuery = <
  ReturnType = KubeObjectListInterface<StageKubeObjectInterface>
>({
  props,
  options,
}: UseCDPipelineStageListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<StageKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_STAGE_LIST,
    () => StageKubeObject.getList(namespace),
    options
  );
};
