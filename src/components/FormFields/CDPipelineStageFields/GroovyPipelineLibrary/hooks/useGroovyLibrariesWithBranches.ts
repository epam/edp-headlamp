import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { useCodebasesByTypeLabelQuery } from '../../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { EDPCodebaseBranchKubeObject } from '../../../../../k8s/EDPCodebaseBranch';
import { React } from '../../../../../plugin.globals';
import { SelectOption } from '../../../../../types/forms';
import { isGroovyLibrary } from '../../../../../utils/checks/isGroovyLibrary';

interface GroovyLibWithBranchesOption {
    option: SelectOption;
    branches: {
        specBranchName: string;
        metadataBranchName: string;
    }[];
}

export const useGroovyLibrariesWithBranches = (): GroovyLibWithBranchesOption[] => {
    const [groovyLibsWithBranchesOptions, setGroovyLibsWithBranchesOptions] = React.useState<
        GroovyLibWithBranchesOption[]
    >([]);

    useCodebasesByTypeLabelQuery(CODEBASE_TYPES.LIBRARY, {
        onSuccess: async data => {
            const groovyLibraries = data?.items.filter(el => isGroovyLibrary(el));
            const groovyLibsWithBranches = await Promise.all(
                groovyLibraries.map(async groovyLib => {
                    const {
                        metadata: { name },
                    } = groovyLib;

                    const { items: codebaseBranches } =
                        await EDPCodebaseBranchKubeObject.getListByCodebaseName(name);

                    if (codebaseBranches.length) {
                        const branchesNames = codebaseBranches.map(el => ({
                            specBranchName: el.spec.branchName,
                            metadataBranchName: el.metadata.name,
                        }));

                        return {
                            option: { value: name, label: name },
                            branches: branchesNames,
                        };
                    }
                })
            );
            setGroovyLibsWithBranchesOptions(groovyLibsWithBranches);
        },
    });

    return groovyLibsWithBranchesOptions;
};
