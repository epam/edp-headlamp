import { useQuery } from 'react-query';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CodebaseKubeObject } from '..';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../labels';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

export const useGitOpsCodebaseQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error,
    CodebaseKubeObjectInterface | undefined
  >(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, CODEBASE_TYPE.SYSTEM],
    () => CodebaseKubeObject.getListByTypeLabel(namespace, CODEBASE_TYPE.SYSTEM),
    {
      select: (data) => {
        return data?.items.find(
          (el) =>
            el.metadata?.labels?.[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
        );
      },
    }
  );
};
