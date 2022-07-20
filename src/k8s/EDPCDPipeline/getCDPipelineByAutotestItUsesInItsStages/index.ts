import { getCDPipelinesStages } from '../../EDPCDPipelineStage/getCDPipelinesStages';
import { getCDPipelineByName } from '../getCDPipelineByName';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const getCDPipelineByAutotestItUsesInItsStages = async (
    namespace: string,
    codebaseName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelinesStages(namespace);

    for (const {
        spec: { qualityGates, cdPipeline },
    } of items) {
        for (const { autotestName } of qualityGates) {
            if (autotestName === codebaseName) {
                return await getCDPipelineByName(namespace, cdPipeline);
            }
        }
    }

    return null;
};
