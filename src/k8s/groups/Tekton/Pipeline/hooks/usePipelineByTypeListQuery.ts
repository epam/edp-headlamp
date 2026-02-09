import { useQuery } from 'react-query';
import { PipelineType } from '../../../../../constants/pipelineTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_PIPELINE_LIST_BY_TYPE } from '../requestKeys';
import { PipelineKubeObjectInterface } from '../types';

export const usePipelineByTypeListQuery = (
  pipelineType: PipelineType,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<KubeObjectListInterface<PipelineKubeObjectInterface>, Error>(
    [REQUEST_KEY_QUERY_PIPELINE_LIST_BY_TYPE, pipelineType],
    () => PipelineKubeObject.getListByPipelineType(namespace, pipelineType)
  );
};
