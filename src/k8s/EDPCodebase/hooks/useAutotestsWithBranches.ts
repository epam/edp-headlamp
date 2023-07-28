import React from 'react';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { AutotestWithBranchesOption } from '../../../widgets/CreateEditStage/components/fields/QualityGates/types';
import { EDPCodebaseBranchKubeObject } from '../../EDPCodebaseBranch';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

export const useAutotestsWithBranches = (): AutotestWithBranchesOption[] => {
    const [autotestsWithBranchesOptions, setAutotestsWithBranchesOptions] = React.useState<
        AutotestWithBranchesOption[]
    >([]);

    useCodebasesByTypeLabelQuery({
        props: {
            codebaseType: CODEBASE_TYPES.AUTOTEST,
        },
        options: {
            onSuccess: async data => {
                const autotestsWithBranches = await Promise.all(
                    data?.items.map(async ({ metadata: { name } }) => {
                        const { items: autotestsBranches } =
                            await EDPCodebaseBranchKubeObject.getListByCodebaseName(
                                getDefaultNamespace(),
                                name
                            );
                        const branchesNames = autotestsBranches.map(el => el.spec.branchName);
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
