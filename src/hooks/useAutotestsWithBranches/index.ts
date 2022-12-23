import { Autotest } from '../../components/FormFields/CDPipelineStageFields/QualityGates/types';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { getCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { getCodebaseBranchesByCodebaseLabel } from '../../k8s/EDPCodebaseBranch';
import { React } from '../../plugin.globals';

interface UseAutotestsWithBranchesProps {
    namespace: string;
}

export const useAutotestsWithBranches = ({
    namespace,
}: UseAutotestsWithBranchesProps): { autotests: Autotest[]; error: Error } => {
    const [autotests, setAutotests] = React.useState<Autotest[]>([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            try {
                if (!namespace) {
                    return;
                }

                const { items: autotests } = await getCodebasesByTypeLabel(
                    namespace,
                    CODEBASE_TYPES['AUTOTEST']
                );

                const autotestsWithBranches = await Promise.all(
                    autotests.map(async ({ metadata: { name } }) => {
                        const { items: autotestsBranches } =
                            await getCodebaseBranchesByCodebaseLabel(namespace, name);
                        const branchesNames = autotestsBranches.map(el => el.metadata.name);
                        return {
                            name: name,
                            branches: branchesNames,
                        };
                    })
                );
                setAutotests(autotestsWithBranches);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace]);

    return { autotests, error };
};
