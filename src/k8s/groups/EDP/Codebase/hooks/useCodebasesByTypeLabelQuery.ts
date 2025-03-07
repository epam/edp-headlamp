import { useQuery, UseQueryOptions } from 'react-query';
import { CodebaseType } from '../../../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CodebaseKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

interface UseCodebasesByTypeLabelQueryProps<ReturnType> {
  props: {
    codebaseType: CodebaseType;
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCodebasesByTypeLabelQuery = <
  ReturnType = KubeObjectListInterface<CodebaseKubeObjectInterface>
>({
  props,
  options,
}: UseCodebasesByTypeLabelQueryProps<ReturnType>) => {
  const { codebaseType } = props;
  const namespace = props?.namespace || getDefaultNamespace();
  return useQuery<KubeObjectListInterface<CodebaseKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, codebaseType],
    () => CodebaseKubeObject.getListByTypeLabel(namespace, codebaseType),
    options
  );
};
