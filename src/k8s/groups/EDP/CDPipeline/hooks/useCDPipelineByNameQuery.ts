import React from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME } from '../requestKeys';
import { CDPipelineKubeObjectInterface } from '../types';

interface UseCDPipelineByNameQueryProps<ReturnType> {
  props: {
    name: string;
    namespace?: string;
  };
  options?: UseQueryOptions<CDPipelineKubeObjectInterface, Error, ReturnType>;
}

export const useCDPipelineByNameQuery = <ReturnType = CDPipelineKubeObjectInterface>({
  props,
  options,
}: UseCDPipelineByNameQueryProps<ReturnType>) => {
  const { name } = props;
  const namespace = props?.namespace || getDefaultNamespace();

  const query = useQuery<CDPipelineKubeObjectInterface, Error, ReturnType>(
    [REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME, name],
    () => CDPipelineKubeObject.getItemByName(namespace, name),
    {
      ...options,
      enabled: options?.enabled && !!name,
    }
  );

  return React.useMemo(() => query, [query]);
};
