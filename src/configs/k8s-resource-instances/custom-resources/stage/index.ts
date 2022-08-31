import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectConfig } from '../../../../k8s/EDPCDPipelineStage/config';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

const { kind, group, version } = EDPCDPipelineStageKubeObjectConfig;

export const createCDPipelineStageExample = (
    kubeObjectData: EDPCDPipelineKubeObjectInterface
): DeepPartial<EDPKubeObjectInterface> => ({
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
        name: 'your cd pipeline stage name',
        namespace: kubeObjectData.metadata.namespace,
    },
    spec: {
        cdPipeline: kubeObjectData.metadata.name,
    },
});
