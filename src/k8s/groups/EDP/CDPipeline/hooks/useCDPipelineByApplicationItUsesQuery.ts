import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPipelineKubeObject } from '..';
import { REQUEST_KEY_QUERY_CD_PIPELINE_LIST } from '../requestKeys';
import { CDPipelineKubeObjectInterface } from '../types';

export const useCDPipelineByApplicationItUsesQuery = (
  codebaseName: string | undefined,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<
    KubeObjectListInterface<CDPipelineKubeObjectInterface>,
    Error,
    CDPipelineKubeObjectInterface | undefined
  >(REQUEST_KEY_QUERY_CD_PIPELINE_LIST, () => CDPipelineKubeObject.getList(namespace), {
    select: (data) => {
      return data?.items.find((item) => item.spec.applications.includes(codebaseName!));
    },
    enabled: !!codebaseName,
  });
};
