import { EDPCDPipelineKubeObjectConfig } from '../../../k8s/EDPCDPipeline/config';
import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';

const { group, version } = EDPCDPipelineKubeObjectConfig;

export const CDPipelineExample: DeepPartial<EDPKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind: 'CDPipeline',
    metadata: {
        name: 'name',
        namespace: 'namespace',
    },
};
