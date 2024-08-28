import { useQuery, UseQueryOptions } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_PIPELINE_BY_NAME } from '../requestKeys';
import { PipelineKubeObjectInterface } from '../types';

interface UsePipelineByNameQueryProps<ReturnType> {
  props: {
    name: string;
    namespace?: string;
  };
  options?: UseQueryOptions<PipelineKubeObjectInterface, Error, ReturnType>;
}

export const usePipelineByNameQuery = <ReturnType = PipelineKubeObjectInterface>({
  props,
  options,
}: UsePipelineByNameQueryProps<ReturnType>) => {
  const { name } = props;
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<PipelineKubeObjectInterface, Error, ReturnType>(
    [REQUEST_KEY_QUERY_PIPELINE_BY_NAME, name],
    () => PipelineKubeObject.getItemByName(namespace, name),
    options
  );
};
