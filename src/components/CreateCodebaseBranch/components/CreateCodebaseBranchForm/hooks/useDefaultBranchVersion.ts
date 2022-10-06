import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { getCodebaseBranchesByCodebaseLabel } from '../../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { React } from '../../../../../plugin.globals';
import { DeepPartial } from '../../../../../types/global';

interface useDefaultBranchVersionProps {
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
}

export const useDefaultBranchVersion = ({ codebaseData }: useDefaultBranchVersionProps) => {
    const {
        spec: { defaultBranch: defaultBranchName },
        metadata: { name, namespace },
    } = codebaseData;

    const [defaultBranch, setDefaultBranch] =
        React.useState<EDPCodebaseBranchKubeObjectInterface>(null);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            try {
                if (!namespace) {
                    return;
                }

                const { items } = await getCodebaseBranchesByCodebaseLabel(namespace, name);
                const [defaultBranch] = items.filter(
                    ({ spec: { branchName } }) => branchName === defaultBranchName
                );

                setDefaultBranch(defaultBranch);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [defaultBranchName, name, namespace]);

    return { defaultBranch, error };
};
