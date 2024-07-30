import React from 'react';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { AutotestWithBranchesOption } from '../../../../../widgets/CreateEditStage/components/fields/QualityGates/types';
import { CodebaseBranchKubeObject } from '../../CodebaseBranch';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

export const useAutotestsWithBranches = (namespace: string): AutotestWithBranchesOption[] => {
  const [autotestsWithBranchesOptions, setAutotestsWithBranchesOptions] = React.useState<
    AutotestWithBranchesOption[]
  >([]);

  const _namespace = namespace || getDefaultNamespace();

  useCodebasesByTypeLabelQuery({
    props: {
      codebaseType: CODEBASE_TYPES.AUTOTEST,
      namespace: _namespace,
    },
    options: {
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
    },
  });

  return autotestsWithBranchesOptions;
};
