import React from 'react';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { SelectOption } from '../../../types/forms';
import { isGroovyLibrary } from '../../../utils/checks/isGroovyLibrary';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCodebaseBranchKubeObject } from '../../EDPCodebaseBranch';
import { useCodebasesByTypeLabelQuery } from './useCodebasesByTypeLabelQuery';

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

  useCodebasesByTypeLabelQuery({
    props: {
      codebaseType: CODEBASE_TYPES.LIBRARY,
    },
    options: {
      onSuccess: async data => {
        const groovyLibraries = data?.items.filter(el => isGroovyLibrary(el));
        const groovyLibsWithBranches = await Promise.all(
          groovyLibraries.map(async groovyLib => {
            const {
              metadata: { name },
            } = groovyLib;

            const { items: codebaseBranches } =
              await EDPCodebaseBranchKubeObject.getListByCodebaseName(getDefaultNamespace(), name);

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
    },
  });

  return groovyLibsWithBranchesOptions;
};
