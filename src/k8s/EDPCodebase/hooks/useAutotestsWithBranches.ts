import React from 'react';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { AutotestWithBranchesOption } from '../../../widgets/CreateEditStage/components/fields/QualityGates/types';
import { EDPCodebaseBranchKubeObject } from '../../EDPCodebaseBranch';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

export const useAutotestsWithBranches = (namespace: string): AutotestWithBranchesOption[] => {
    const [autotestsWithBranchesOptions, setAutotestsWithBranchesOptions] = React.useState<
        AutotestWithBranchesOption[]
    >([]);

    useCodebasesByTypeLabelQuery({
        props: {
            codebaseType: CODEBASE_TYPES.AUTOTEST,
            namespace,
        },
        options: {
            onSuccess: async data => {
                if (!data) {
                    return;
                }
                const autotestsWithBranches = await Promise.all(
                    data?.items.map(async ({ metadata: { name } }) => {
                        const { items: autotestsBranches } =
                            await EDPCodebaseBranchKubeObject.getListByCodebaseName(
                                namespace,
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
