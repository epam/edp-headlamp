import { useCDPipelineByAutotestBranchItUsesInItsStagesQuery } from '../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByAutotestBranchItUsesInItsStagesQuery';
import { useCDPipelineByCodebaseBranchItUsesQuery } from '../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByCodebaseBranchItUsesQuery';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../k8s/groups/EDP/CodebaseBranch/types';
import { isAutotest } from '../../../utils/checks/isAutotest';
import { isLibrary } from '../../../utils/checks/isLibrary';

export const useConflictedCDPipeline = (
  codebaseBranch: CodebaseBranchKubeObjectInterface,
  codebase: CodebaseKubeObjectInterface
) => {
  const codebaseBranchSpecName = codebaseBranch.spec.branchName;
  const codebaseBranchMetadataName = codebaseBranch.metadata.name;

  const CDPipelineByAutotestBranchItUsesInItsStagesQuery =
    useCDPipelineByAutotestBranchItUsesInItsStagesQuery(
      isAutotest(codebase) ? codebaseBranchSpecName : null
    );

  const CDPipelineByCodebaseBranchItUsesQuery = useCDPipelineByCodebaseBranchItUsesQuery(
    !isLibrary(codebase) && !isAutotest(codebase) ? codebaseBranchMetadataName : null
  );

  if (CDPipelineByAutotestBranchItUsesInItsStagesQuery.data) {
    return CDPipelineByAutotestBranchItUsesInItsStagesQuery.data;
  }

  if (CDPipelineByCodebaseBranchItUsesQuery.data) {
    return CDPipelineByCodebaseBranchItUsesQuery.data;
  }
};
