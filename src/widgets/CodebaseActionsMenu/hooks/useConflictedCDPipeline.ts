import { useCDPipelineByApplicationItUsesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByApplicationItUsesQuery';
import { useCDPipelineByAutotestItUsesInItsStagesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByAutotestItUsesInItsStagesQuery';
import { useCDPipelineByGroovyLibraryItUsesInItsStagesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByGroovyLibraryItUsesInItsStagesQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { isApplication } from '../../../utils/checks/isApplication';
import { isAutotest } from '../../../utils/checks/isAutotest';
import { isGroovyLibrary } from '../../../utils/checks/isGroovyLibrary';
import { isLibrary } from '../../../utils/checks/isLibrary';

export const useConflictedCDPipeline = (codebase: EDPCodebaseKubeObjectInterface) => {
  const CDPipelineByGroovyLibraryItUsesInItsStagesQuery =
    useCDPipelineByGroovyLibraryItUsesInItsStagesQuery({
      props: {
        codebaseName: codebase?.metadata.name,
      },
      options: {
        enabled: !!codebase && isLibrary(codebase) && isGroovyLibrary(codebase),
      },
    });

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

  if (CDPipelineByGroovyLibraryItUsesInItsStagesQuery.data) {
    return CDPipelineByGroovyLibraryItUsesInItsStagesQuery.data;
  }

  if (CDPipelineByAutotestItUsesInItsStagesQuery.data) {
    return CDPipelineByAutotestItUsesInItsStagesQuery.data;
  }

  if (CDPipelineByApplicationItUsesQuery.data) {
    return CDPipelineByApplicationItUsesQuery.data;
  }
};
