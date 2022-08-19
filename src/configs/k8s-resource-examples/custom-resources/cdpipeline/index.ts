import { EDPCDPipelineKubeObjectConfig } from '../../../../k8s/EDPCDPipeline/config';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

const { kind, group, version } = EDPCDPipelineKubeObjectConfig;

export const CDPipelineExample: DeepPartial<EDPKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
        name: 'name',
        namespace: 'namespace',
    },
};
