import { getCDPipelines } from '../getCDPipelines';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const getCDPipelineByCodebaseBranchItUses = async (
    namespace: string,
    codebaseBranchName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelines(namespace);
    for (const item of items) {
        if (item.spec.inputDockerStreams.includes(codebaseBranchName)) {
            return item;
        }
    }

    return null;
};
