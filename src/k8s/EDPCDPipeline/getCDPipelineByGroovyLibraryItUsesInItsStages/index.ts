import { getCDPipelinesStages } from '../../EDPCDPipelineStage/getCDPipelinesStages';
import { getCDPipelineByName } from '../getCDPipelineByName';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const getCDPipelineByGroovyLibraryItUsesInItsStages = async (
    namespace: string,
    codebaseName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelinesStages(namespace);

    for (const {
        spec: {
            source: {
                library: { name },
            },
            cdPipeline,
        },
    } of items) {
        if (name === codebaseName) {
            return await getCDPipelineByName(namespace, cdPipeline);
        }
    }

    return null;
};
