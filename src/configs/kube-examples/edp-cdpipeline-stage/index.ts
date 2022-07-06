import { EDPCDPipelineStageKubeObjectConfig } from '../../../k8s/EDPCDPipelineStage/config';
import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';

const {
    name: { singularForm },
    group,
    version,
} = EDPCDPipelineStageKubeObjectConfig;

export const createCDPipelineStageExample = (
    cdpipelineName: string
): DeepPartial<EDPKubeObjectInterface> => ({
    apiVersion: `${group}/${version}`,
    kind: capitalizeFirstLetter(singularForm),
    metadata: {
        name: 'your cd pipeline stage name',
        namespace: 'your cd pipeline stage namespace',
    },
    spec: {
        cdPipeline: cdpipelineName,
    },
});
