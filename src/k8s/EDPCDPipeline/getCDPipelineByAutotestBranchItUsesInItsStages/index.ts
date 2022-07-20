import { getCDPipelinesStages } from '../../EDPCDPipelineStage/getCDPipelinesStages';
import { getCDPipelineByName } from '../getCDPipelineByName';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const getCDPipelineByAutotestBranchItUsesInItsStages = async (
    namespace: string,
    codebaseBranchName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelinesStages(namespace);

    for (const {
        spec: { qualityGates, cdPipeline },
    } of items) {
        for (const { branchName } of qualityGates) {
            if (branchName && branchName === codebaseBranchName) {
                return await getCDPipelineByName(namespace, cdPipeline);
            }
        }
    }

    return null;
};
