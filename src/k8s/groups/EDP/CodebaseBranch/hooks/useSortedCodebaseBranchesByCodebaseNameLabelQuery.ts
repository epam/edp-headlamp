import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { sortKubeObjectByCreationTimestamp } from '../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { CodebaseBranchKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME } from '../requestKeys';
import { CodebaseBranchKubeObjectInterface } from '../types';

export const useSortedCodebaseBranchesByCodebaseNameLabelQuery = (
  codebaseName: string,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<
    KubeObjectListInterface<CodebaseBranchKubeObjectInterface>,
    Error,
    CodebaseBranchKubeObjectInterface[]
  >(
    [REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME, codebaseName],
    () => CodebaseBranchKubeObject.getListByCodebaseName(namespace, codebaseName),
    {
      enabled: !!codebaseName,
      select: (data) => data.items.sort((a, b) => sortKubeObjectByCreationTimestamp(a, b, true)),
    }
  );
};
