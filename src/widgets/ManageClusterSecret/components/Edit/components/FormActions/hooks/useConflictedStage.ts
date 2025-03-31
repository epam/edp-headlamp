import { useQuery } from 'react-query';
import { StageKubeObject } from '../../../../../../../k8s/groups/EDP/Stage';
import { REQUEST_KEY_QUERY_STAGE_LIST } from '../../../../../../../k8s/groups/EDP/Stage/requestKeys';
import { StageKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Stage/types';
import { KubeObjectListInterface } from '../../../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../../../utils/getDefaultNamespace';

export const useConflictedStageQuery = (clusterName: string | undefined) => {
  const namespace = getDefaultNamespace();

  return useQuery<
    KubeObjectListInterface<StageKubeObjectInterface>,
    Error,
    StageKubeObjectInterface | undefined
  >(REQUEST_KEY_QUERY_STAGE_LIST, () => StageKubeObject.getList(namespace), {
    select: (data) =>
      data?.items.find((item) => {
        return item.spec.clusterName === clusterName;
      }),
    enabled: !!clusterName,
  });
};
