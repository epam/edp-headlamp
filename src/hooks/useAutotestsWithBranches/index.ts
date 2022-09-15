import { Autotest } from '../../components/CreateCDPipelineStage/components/CreateCDPipelineStageForm/components/fields/QualityGates/types';
import { getCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { getCodebaseBranchesByCodebaseLabel } from '../../k8s/EDPCodebaseBranch';
import { React } from '../../plugin.globals';

interface useAutotestsWithBranchesProps {
    namespace: string;
}

export const useAutotestsWithBranches = ({
    namespace,
}: useAutotestsWithBranchesProps): { autotests: Autotest[]; error: Error } => {
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
                    EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm
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
            } catch (error: any) {
                setError(error);
            }
        })();
    }, [namespace]);

    return { autotests, error };
};
