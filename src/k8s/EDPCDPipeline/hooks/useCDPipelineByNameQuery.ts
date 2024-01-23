import React from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME } from '../requestKeys';
import { EDPCDPipelineKubeObjectInterface } from '../types';

interface UseCDPipelineByNameQueryProps<ReturnType> {
  props: {
    name: string;
    namespace?: string;
  };
  options?: UseQueryOptions<EDPCDPipelineKubeObjectInterface, Error, ReturnType>;
}

export const useCDPipelineByNameQuery = <ReturnType = EDPCDPipelineKubeObjectInterface>({
  props,
  options,
}: UseCDPipelineByNameQueryProps<ReturnType>) => {
  const { name } = props;
  const namespace = props?.namespace || getDefaultNamespace();

  const query = useQuery<EDPCDPipelineKubeObjectInterface, Error, ReturnType>(
    [REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME, name],
    () => EDPCDPipelineKubeObject.getItemByName(namespace, name),
    {
      ...options,
      enabled: options?.enabled && !!name,
    }
  );

  return React.useMemo(() => query, [query]);
};
