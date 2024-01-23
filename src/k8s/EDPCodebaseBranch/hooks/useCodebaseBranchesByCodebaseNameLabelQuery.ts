import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCodebaseBranchKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME } from '../requestKeys';
import { EDPCodebaseBranchKubeObjectInterface } from '../types';

interface UseCodebaseBranchesByCodebaseNameLabelQueryProps<ReturnType> {
  props: {
    codebaseName: string;
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCodebaseBranchesByCodebaseNameLabelQuery = <
  ReturnType = KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>
>({
  props,
  options,
}: UseCodebaseBranchesByCodebaseNameLabelQueryProps<ReturnType>) => {
  const { codebaseName } = props;
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME, codebaseName],
    () => EDPCodebaseBranchKubeObject.getListByCodebaseName(namespace, codebaseName),
    {
      ...options,
      enabled: options?.enabled && !!codebaseName,
    }
  );
};
