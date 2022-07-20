import { getCDPipelines } from '../getCDPipelines';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const getCDPipelineByApplicationItUses = async (
    namespace: string,
    codebaseName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelines(namespace);
    for (const item of items) {
        if (item.spec.applications.includes(codebaseName)) {
            return item;
        }
    }

    return null;
};
