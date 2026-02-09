import { useQuery } from 'react-query';
import { CodebaseType } from '../../../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CodebaseKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

export const useCodebasesByTypeLabelQuery = (
  codebaseType: CodebaseType,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<KubeObjectListInterface<CodebaseKubeObjectInterface>, Error>(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, codebaseType],
    () => CodebaseKubeObject.getListByTypeLabel(namespace, codebaseType)
  );
};
