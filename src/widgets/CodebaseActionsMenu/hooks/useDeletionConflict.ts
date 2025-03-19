import { useCDPipelineByApplicationItUsesQuery } from '../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByApplicationItUsesQuery';
import { useCDPipelineByAutotestItUsesInItsStagesQuery } from '../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByAutotestItUsesInItsStagesQuery';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { isApplication } from '../../../utils/checks/isApplication';
import { isAutotest } from '../../../utils/checks/isAutotest';

export const useDeletionConflict = (codebase: CodebaseKubeObjectInterface) => {
  const CDPipelineByAutotestItUsesInItsStagesQuery = useCDPipelineByAutotestItUsesInItsStagesQuery(
    isAutotest(codebase) ? codebase.metadata.name : undefined
  );

  const CDPipelineByApplicationItUsesQuery = useCDPipelineByApplicationItUsesQuery(
    isApplication(codebase) ? codebase.metadata.name : undefined
  );

  if (!codebase) {
    return null;
  }

  if (CDPipelineByAutotestItUsesInItsStagesQuery.data) {
    return CDPipelineByAutotestItUsesInItsStagesQuery.data;
  }

  if (CDPipelineByApplicationItUsesQuery.data) {
    return CDPipelineByApplicationItUsesQuery.data;
  }
};
