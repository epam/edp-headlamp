import { useCDPipelineByApplicationItUsesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByApplicationItUsesQuery';
import { useCDPipelineByAutotestItUsesInItsStagesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByAutotestItUsesInItsStagesQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { isApplication } from '../../../utils/checks/isApplication';
import { isAutotest } from '../../../utils/checks/isAutotest';

export const useDeletionConflict = (codebase: EDPCodebaseKubeObjectInterface) => {
  const CDPipelineByAutotestItUsesInItsStagesQuery = useCDPipelineByAutotestItUsesInItsStagesQuery({
    props: {
      codebaseName: codebase?.metadata.name,
    },
    options: {
      enabled: !!codebase && isAutotest(codebase),
    },
  });

  const CDPipelineByApplicationItUsesQuery = useCDPipelineByApplicationItUsesQuery({
    props: {
      codebaseName: codebase?.metadata.name,
    },
    options: {
      enabled: !!codebase && isApplication(codebase),
    },
  });

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
