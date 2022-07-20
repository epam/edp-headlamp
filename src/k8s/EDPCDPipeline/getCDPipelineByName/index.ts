import { getCDPipelines } from '../getCDPipelines';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const getCDPipelineByName = async (
    namespace: string,
    cdPipeline: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelines(namespace);
    for (const item of items) {
        if (item.spec.name === cdPipeline) {
            return item;
        }
    }

    return null;
};
