import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { useCodebasesByTypeLabelQuery } from '../../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { EDPCodebaseBranchKubeObject } from '../../../../../k8s/EDPCodebaseBranch';
import { React } from '../../../../../plugin.globals';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { AutotestWithBranchesOption } from '../types';

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
