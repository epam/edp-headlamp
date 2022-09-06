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
}: useAutotestsWithBranchesProps): { autotests: Autotest[] } => {
    const [autotests, setAutotests] = React.useState<Autotest[]>([]);

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
            } catch (error: any) {
                console.error(error);
            }
        })();
    }, [namespace]);

    return { autotests };
};
