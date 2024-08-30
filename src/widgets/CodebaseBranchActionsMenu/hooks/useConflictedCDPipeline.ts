import { useCDPipelineByAutotestBranchItUsesInItsStagesQuery } from '../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByAutotestBranchItUsesInItsStagesQuery';
import { useCDPipelineByCodebaseBranchItUsesQuery } from '../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByCodebaseBranchItUsesQuery';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../k8s/groups/EDP/CodebaseBranch/types';
import { isAutotest } from '../../../utils/checks/isAutotest';
import { isGroovyLibrary } from '../../../utils/checks/isGroovyLibrary';
import { isLibrary } from '../../../utils/checks/isLibrary';

export const useConflictedCDPipeline = (
  codebaseBranch: CodebaseBranchKubeObjectInterface,
  codebase: CodebaseKubeObjectInterface
) => {
  const codebaseBranchSpecName = codebaseBranch?.spec.branchName;
  const codebaseBranchMetadataName = codebaseBranch?.metadata.name;

  const CDPipelineByAutotestBranchItUsesInItsStagesQuery =
    useCDPipelineByAutotestBranchItUsesInItsStagesQuery({
      props: {
        codebaseBranchName: codebaseBranchSpecName,
      },
      options: {
        enabled: !!codebaseBranch && isAutotest(codebase),
      },
    });

  const CDPipelineByCodebaseBranchItUsesQuery = useCDPipelineByCodebaseBranchItUsesQuery({
    props: {
      codebaseBranchName: codebaseBranchMetadataName,
    },
    options: {
      enabled:
        !!codebaseBranch &&
        !isLibrary(codebase) &&
        isGroovyLibrary(codebase) &&
        !isAutotest(codebase),
    },
  });

  if (CDPipelineByAutotestBranchItUsesInItsStagesQuery.data) {
    return CDPipelineByAutotestBranchItUsesInItsStagesQuery.data;
  }

  if (CDPipelineByCodebaseBranchItUsesQuery.data) {
    return CDPipelineByCodebaseBranchItUsesQuery.data;
  }
};
