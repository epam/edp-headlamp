import { useQuery } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME } from '../requestKeys';
import { CDPipelineKubeObjectInterface } from '../types';

export const useCDPipelineByNameQuery = (
  name: string | null,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<CDPipelineKubeObjectInterface, Error>(
    [REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME, name],
    () => CDPipelineKubeObject.getItemByName(namespace, name!),
    {
      enabled: !!name,
    }
  );
};
