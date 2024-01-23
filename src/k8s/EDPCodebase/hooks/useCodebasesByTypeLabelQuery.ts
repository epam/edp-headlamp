import { useQuery, UseQueryOptions } from 'react-query';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCodebaseKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { EDPCodebaseKubeObjectInterface } from '../types';

interface UseCodebasesByTypeLabelQueryProps<ReturnType> {
  props: {
    codebaseType: CODEBASE_TYPES;
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCodebaseKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCodebasesByTypeLabelQuery = <
  ReturnType = KubeObjectListInterface<EDPCodebaseKubeObjectInterface>
>({
  props,
  options,
}: UseCodebasesByTypeLabelQueryProps<ReturnType>) => {
  const { codebaseType } = props;
  const namespace = props?.namespace || getDefaultNamespace();
  return useQuery<KubeObjectListInterface<EDPCodebaseKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, codebaseType],
    () => EDPCodebaseKubeObject.getListByTypeLabel(namespace, codebaseType),
    options
  );
};
