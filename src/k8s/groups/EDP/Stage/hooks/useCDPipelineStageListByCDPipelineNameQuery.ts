import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { StageKubeObject } from '../index';
import { REQUEST_KEY_QUERY_STAGE_LIST } from '../requestKeys';
import { StageKubeObjectInterface } from '../types';

export const useCDPipelineStageListByCDPipelineNameQuery = <
  ReturnType = KubeObjectListInterface<StageKubeObjectInterface>
>(
  CDPipelineName: string,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<KubeObjectListInterface<StageKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_STAGE_LIST,
    () => StageKubeObject.getListByCDPipelineName(namespace, CDPipelineName)
  );
};
