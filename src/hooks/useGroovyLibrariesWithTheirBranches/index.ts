import { getCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { getCodebaseBranchesByCodebaseLabel } from '../../k8s/EDPCodebaseBranch';
import { React } from '../../plugin.globals';
import { SelectOption } from '../../types/forms';
import { isGroovyLibrary } from '../../utils/checks/isGroovyLibrary';

interface useGroovyLibrariesWithTheirBranchesProps {
    namespace: string;
    defaultOption: SelectOption;
}

export const useGroovyLibrariesWithTheirBranches = ({
    namespace,
    defaultOption,
}: useGroovyLibrariesWithTheirBranchesProps): {
    groovyLibraries: EDPCodebaseKubeObjectInterface;
} => {
    const [groovyLibraries, setGroovyLibraries] = React.useState<EDPCodebaseKubeObjectInterface>([
        defaultOption,
    ]);

    React.useEffect(() => {
        (async () => {
            try {
                if (!namespace) {
                    return;
                }

                const { items: libraries } = await getCodebasesByTypeLabel(
                    namespace,
                    EDPCodebaseKubeObjectConfig.types.library.name.singularForm
                );

                const groovyLibraries = libraries.filter(el => isGroovyLibrary(el));
                const groovyLibrariesWithBranches = await Promise.all(
                    groovyLibraries.map(async ({ metadata: { name } }) => {
                        const { items: branches } = await getCodebaseBranchesByCodebaseLabel(
                            namespace,
                            name
                        );

                        if (branches.length) {
                            const branchesNames = branches.map(({ metadata: { name } }) => ({
                                value: name,
                                label: name,
                            }));

                            return {
                                option: { value: name, label: name },
                                branches: branchesNames,
                            };
                        }
                    })
                );
                setGroovyLibraries(groovyLibrariesWithBranches.filter(Boolean));
            } catch (error: any) {
                console.error(error);
            }
        })();
    }, [namespace]);

    return { groovyLibraries };
};
