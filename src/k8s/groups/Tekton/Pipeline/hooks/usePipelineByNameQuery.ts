import { useQuery } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_PIPELINE_BY_NAME } from '../requestKeys';
import { PipelineKubeObjectInterface } from '../types';

export const usePipelineByNameQuery = (name: string, namespace: string = getDefaultNamespace()) => {
  return useQuery<PipelineKubeObjectInterface, Error>(
    [REQUEST_KEY_QUERY_PIPELINE_BY_NAME, name],
    () => PipelineKubeObject.getItemByName(namespace, name),
    {
      enabled: !!name,
    }
  );
};
