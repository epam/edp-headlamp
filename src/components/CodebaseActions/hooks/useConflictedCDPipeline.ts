import { useCDPipelineByApplicationItUsesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByApplicationItUsesQuery';
import { useCDPipelineByAutotestItUsesInItsStagesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByAutotestItUsesInItsStagesQuery';
import { useCDPipelineByGroovyLibraryItUsesInItsStagesQuery } from '../../../k8s/EDPCDPipeline/hooks/useCDPipelineByGroovyLibraryItUsesInItsStagesQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { isApplication } from '../../../utils/checks/isApplication';
import { isAutotest } from '../../../utils/checks/isAutotest';
import { isGroovyLibrary } from '../../../utils/checks/isGroovyLibrary';
import { isLibrary } from '../../../utils/checks/isLibrary';

export const useConflictedCDPipeline = (codebase: EDPCodebaseKubeObjectInterface) => {
    const {
        metadata: { name },
    } = codebase;

    const CDPipelineByGroovyLibraryItUsesInItsStagesQuery =
        useCDPipelineByGroovyLibraryItUsesInItsStagesQuery(name, {
            enabled: isLibrary(codebase) && isGroovyLibrary(codebase),
        });

    const CDPipelineByAutotestItUsesInItsStagesQuery =
        useCDPipelineByAutotestItUsesInItsStagesQuery(name, {
            enabled: isAutotest(codebase),
        });

    const CDPipelineByApplicationItUsesQuery = useCDPipelineByApplicationItUsesQuery(name, {
        enabled: isApplication(codebase),
    });

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
