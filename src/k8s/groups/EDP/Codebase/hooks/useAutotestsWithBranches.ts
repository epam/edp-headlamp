import React from 'react';
import { useQuery } from 'react-query';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { AutotestWithBranchesOption } from '../../../../../widgets/dialogs/ManageStage/components/fields/QualityGates/types';
import { CodebaseBranchKubeObject } from '../../CodebaseBranch';
import { CodebaseKubeObject } from '..';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

export const useAutotestsWithBranches = (
  namespace: string = getDefaultNamespace()
): AutotestWithBranchesOption[] => {
  const [autotestsWithBranchesOptions, setAutotestsWithBranchesOptions] = React.useState<
    AutotestWithBranchesOption[]
  >([]);

  const _namespace = namespace || getDefaultNamespace();

  useQuery<KubeObjectListInterface<CodebaseKubeObjectInterface>, Error>(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, CODEBASE_TYPE.AUTOTEST],
    () => CodebaseKubeObject.getListByTypeLabel(namespace, CODEBASE_TYPE.AUTOTEST),
    {
      cacheTime: 0,
      onSuccess: async (data) => {
        if (!data) {
          return;
        }
        const autotestsWithBranches = await Promise.all(
          data?.items.map(async ({ metadata: { name } }) => {
            const { items: autotestsBranches } =
              await CodebaseBranchKubeObject.getListByCodebaseName(_namespace, name);
            const branchesNames = autotestsBranches.map((el) => el.spec.branchName);
            return {
              name,
              branches: branchesNames,
            };
          })
        );
        setAutotestsWithBranchesOptions(autotestsWithBranches);
      },
    }
  );

  return autotestsWithBranchesOptions;
};
