import { getCDPipelineByApplicationItUses } from '../../k8s/EDPCDPipeline/getCDPipelineByApplicationItUses';
import { getCDPipelineByAutotestItUsesInItsStages } from '../../k8s/EDPCDPipeline/getCDPipelineByAutotestItUsesInItsStages';
import { getCDPipelineByGroovyLibraryItUsesInItsStages } from '../../k8s/EDPCDPipeline/getCDPipelineByGroovyLibraryItUsesInItsStages';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { isApplication } from '../../utils/checks/isApplication';
import { isAutotest } from '../../utils/checks/isAutotest';
import { isGroovyLibrary } from '../../utils/checks/isGroovyLibrary';
import { isLibrary } from '../../utils/checks/isLibrary';

export const getConflictedCDPipeline = async (
    codebase: EDPCodebaseKubeObjectInterface
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const {
        metadata: { name, namespace },
    } = codebase;

    if (isLibrary(codebase) && isGroovyLibrary(codebase)) {
        return await getCDPipelineByGroovyLibraryItUsesInItsStages(namespace, name);
    } else if (isAutotest(codebase)) {
        return await getCDPipelineByAutotestItUsesInItsStages(namespace, name);
    } else if (isApplication(codebase)) {
        return await getCDPipelineByApplicationItUses(namespace, name);
    }
};
